import { supabase } from "./supabaseClient";

// Função para upload da foto
export const uploadUserPhoto = async (file, identificador) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${identificador.replace(/[^a-zA-Z0-9]/g, "_")}.${fileExt}`;
    const filePath = `usuarios/${fileName}`; // <- só 'usuarios/', não repita 'fotos-perfil'

    const { error: uploadError } = await supabase.storage
      .from('fotos-perfil')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type
      });

    if (uploadError) throw uploadError;

    const { data, error: publicUrlError } = supabase.storage
      .from('fotos-perfil')
      .getPublicUrl(filePath);

    if (publicUrlError) throw publicUrlError;

    return {
      success: true,
      publicUrl: data.publicUrl,
      filePath
    };
  } catch (error) {
    console.error("Erro ao enviar imagem:", error.message || error);
    return {
      success: false,
      error: error.message || "Erro desconhecido ao enviar imagem."
    };
  }
};


export const criarUsuario = async (dados) => {
  // 1. Criar usuário no Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: dados.email,
    password: dados.senha
  });

  if (authError) {
    return { success: false, error: authError.message };
  }

  // 2. Upload da imagem (se houver)
  let publicUrl = null;
  let filePath = null;

  if (dados.fotoFile) {
    const upload = await uploadUserPhoto(dados.fotoFile, dados.email);
    if (!upload.success) {
      return { success: false, error: upload.error };
    }
    publicUrl = upload.publicUrl;
    filePath = upload.filePath;
  }

  // 3. Inserir na tabela usuario
  const { error: dbError } = await supabase
    .from("usuario")
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

  if (dados.fotoFile) {
    const upload = await uploadUserPhoto(dados.fotoFile, dados.email);
    if (!upload.success) {
      return { success: false, error: upload.error };
    }
    publicUrl = upload.publicUrl;
    filePath = upload.filePath;
  }

  const { error } = await supabase
    .from("usuario")
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
    .eq("codigo", codigo);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};


export const excluirUsuario = async (codigo) => {
  try {
    // 1. Buscar o caminho da foto (fotoPath)
    const { data: usuario, error: fetchError } = await supabase
      .from("usuario")
      .select("fotopath")
      .eq("codigo", codigo)
      .single();

    if (fetchError) {
      return { success: false, error: "Erro ao buscar usuário: " + fetchError.message };
    }

    // 2. Remover imagem do Storage, se existir
    if (usuario.fotopath) {
      const { error: storageError } = await supabase
        .storage
        .from("fotos-perfil")
        .remove([usuario.fotopath]);

      if (storageError) {
        console.warn("⚠️ Imagem não pôde ser removida:", storageError.message);
        // continua mesmo assim
      }
    }

    // 3. Remover o registro do banco
    const { error: deleteError } = await supabase
      .from("usuario")
      .delete()
      .eq("codigo", codigo);

    if (deleteError) {
      return { success: false, error: "Erro ao excluir usuário: " + deleteError.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || "Erro inesperado ao excluir usuário." };
  }
};