import { supabase } from "./supabaseClient";

// Função para upload da foto
export const uploadUserPhoto = async (file, identificador) => {
  const fileExt = file.name.split('.').pop();
  const filePath = `fotos-perfil/${identificador}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('fotos-perfil')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('fotos-perfil')
    .getPublicUrl(filePath);

  return { publicUrl: data.publicUrl, filePath };
};

export const criarUsuario = async (dados) => {
  // 1. Criação no Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: dados.email,
    password: dados.senha
  });

  if (authError) {
    return { success: false, error: authError.message };
  }

  // 2. Upload da foto, se houver
  let publicUrl = null;
  let filePath = null;

  if (dados.fotoFile) {
    try {
      const upload = await uploadUserPhoto(dados.fotoFile, dados.email);
      publicUrl = upload.publicUrl;
      filePath = upload.filePath;
    } catch (uploadError) {
      console.error("Erro ao fazer upload da foto:", uploadError);
      return { success: false, error: uploadError.message };
    }
  }

  // 3. Inserção na tabela usuario
  const { error: dbError } = await supabase
    .from('usuario')
    .insert([{
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      email: dados.email,
      administrador: dados.administrador === "SIM",
      ativo: dados.ativo === "SIM",
      realizar_reservas_fixas: dados.reservasFixas === "SIM",
      foto: publicUrl,
      fotopath: filePath
    }]);

  if (dbError) {
    return { success: false, error: dbError.message };
  }

  return { success: true };
};

export const atualizarUsuario = async (codigo, dados) => {
  let publicUrl = dados.foto;
  let filePath = dados.fotoPath;

  // Se houver nova foto, faz o upload
  if (dados.fotoFile) {
    try {
      const upload = await uploadUserPhoto(dados.fotoFile, dados.email);
      publicUrl = upload.publicUrl;
      filePath = upload.filePath;
    } catch (uploadError) {
      console.error("Erro ao fazer upload da nova foto:", uploadError);
      return { success: false, error: uploadError.message };
    }
  }

  const { error } = await supabase
    .from('usuario')
    .update({
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      email: dados.email,
      administrador: dados.administrador === "SIM",
      ativo: dados.ativo === "SIM",
      realizar_reservas_fixas: dados.reservasFixas === "SIM",
      foto: publicUrl,
      fotopath: filePath
    })
    .eq('codigo', codigo); 

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};

export const excluirUsuario = async (codigo) => {
  const { error } = await supabase
    .from('usuario')
    .delete()
    .eq('codigo', codigo);  

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
