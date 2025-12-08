// pages/profile.ts

import { registerSubmit } from "../core/events";
import { sendJSON } from "../sendJSON";

/* 
        <div>
          <div class="avatar avatar-lg default nb-rounded">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" class="nb-rounded">
          </div>
        </div>
*/

export function renderProfile(): string {
  return `
    <div class="flex-grow flex flex-col gap-2 items-center justify-center text-center px-2">
      <h1 class="text-2xl mb-6">Profile</h1>
      <form id="profileForm" data-action="profile.update" class="flex flex-col gap-2 w-full max-w-xs">

        <div class="flex justify-center mb-4">
          <!-- <div class="relative group cursor-pointer" onclick="document.getElementById('avatarInput').click()"> -->
          <div class="relative group cursor-pointer" onclick="document.getElementsByName('avatar')[0].click()">
          <div class="nb-avatar nb-avatar-lg default nb-rounded overflow-hidden">
              <img id="avatarPreview" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" class="nb-rounded object-cover w-full h-full">
              <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity nb-rounded">
                <i class="fa fa-camera text-white"></i>
              </div>
            </div>
          </div>
          <!-- <input type="file" id="avatarInput" name="avatar" accept="image/*" class="hidden" onchange="previewAvatar(event)"> -->
          </div>
          
        <input
          name="avatar"
          type="file"
          accept="image/*"
          class="hidden"
          onchange="previewAvatar(event)"
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          class="nb-input default nb-rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          class="nb-input default nb-rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          class="nb-input default nb-rounded"
        />
        <input
          name="passwordConfirm"
          type="password"
          placeholder="Confirm password"
          class="nb-input default nb-rounded"
        />
        <button type="submit" class="nb-button warning nb-rounded">Update</button>
      </form>

      <form id="eraseForm" data-action="profile.erase" class="flex flex-col gap-2 w-full max-w-xs">          
        <button type="submit" class="nb-button error nb-rounded">Erase account</button>
      </form>

    </div>
  `;
}

(window as any).previewAvatar = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.getElementById('avatarPreview') as HTMLImageElement;
      if (img && e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
};

registerSubmit("profile.update", async (_e: Event) => {
  // e.preventDefault();

  const email = (document.getElementsByName("email")[0] as HTMLInputElement).value;
  const username = (document.getElementsByName("username")[0] as HTMLInputElement).value;
  const password = (document.getElementsByName("password")[0] as HTMLInputElement).value;
  const passwordConfirm = (document.getElementsByName("passwordConfirm")[0] as HTMLInputElement).value;
  
  // Récupération du fichier
  const avatarInput = document.getElementsByName("avatar")[0] as HTMLInputElement;
  const avatarFile = avatarInput.files ? avatarInput.files[0] : null;

  // Création du FormData
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  if (password)
    formData.append("password", password);
  if (passwordConfirm)
    formData.append("passwordConfirm", passwordConfirm);
  if (avatarFile)
    formData.append("avatar", avatarFile);

  try {
    // Envoi via fetch standard
    const response = await fetch("/api/profile", {
      method: "POST",
      body: formData,
      // IMPORTANT: Ne PAS définir 'Content-Type' manuellement ici.
      // Le navigateur le fera automatiquement avec le bon 'boundary' pour le multipart.
    });

    // Lecture de la réponse JSON (si ton backend renvoie du JSON)
    const data = await response.json();

    if (response.ok) {
      createAlert({
        message: "Profil mis à jour avec succès !",
        type: "success"
      });
    } else {
      // Gestion des erreurs renvoyées par le backend
      createAlert({
        message: data.message || "Erreur lors de la mise à jour.",
        type: "error"
      });
    }
  } catch (error) {
    // Erreur réseau ou autre
    console.error("Erreur:", error);
    createAlert({
      message: "Impossible de contacter le serveur.",
      type: "error"
    });
  }
});

registerSubmit("profile.erase", async (_e: Event) => {
  // e.preventDefault();

  createDialog({
    message: "Confirm account deletion.",
    type: "error",
    rounded: true,
    confirmText: "Delete",
    cancelText: "Cancel",
    onConfirm: async () => {
      const res = await sendJSON("/api/erase", { erase_account: true });
      if (res.ok)
        window.location.href = "/signin";
      else
        console.log("Connection failed");      
    },
    onCancel: () => {
      return
    }
  });


});