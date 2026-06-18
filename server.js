import { serve, file } from "bun";
import { existsSync } from "fs";
import { readFile, writeFile } from "node:fs/promises";

serve({

  port: 3000,
  hostname: "localhost",

  async fetch(req) {

    const url = new URL(req.url); 

    if (url.pathname === "/auth" && req.method === "POST") {
      try {
        // Récupérer les données du formulaire
        const formDatas = await req.formData();
        const tel = formDatas.get("numero");
        const motdepasse = formDatas.get("motdepasse");
        

        // Charger le fichier JSON
        const usersFile = await readFile("./user.json", "utf-8");
        const users = JSON.parse(usersFile);

        // Vérifier si l'utilisateur existe
        const found = users.find(
          (u) => u.tel === tel && u.motdepasse === motdepasse
        );
        
        if (found) {

          const { motdepasse, ...userWithoutPassword } = found;
          const cookieValue = encodeURIComponent(JSON.stringify(userWithoutPassword));

        return new Response( null, {
          status:302,
          headers: {
            "location":"/connexion-reusssi.html",
            "Content-Type": "text/html",
            "Set-Cookie": `user=${cookieValue}; HttpOnly; Path=/; Max-Age=3600`
          },
        });


        }
        else{
           return new Response("404 - Utilisateur non trouvé", { status: 404 });
        }

      }catch (err) {
        return new Response("❌ Erreur lors du traitement du formulaire", { status: 400 });
      }
    }
    
    else if(url.pathname === "/enregistrement" && req.method === "POST") {

      const Datas =  await req.formData();

        //extraction des donnees du formulaire recu dans ;q requete
        const nom = Datas.get("nom");
        const postNom = Datas.get("post-nom");
        const prenom = Datas.get("prenom");
        const born = Datas.get("born");
        const district = Datas.get("district"); 
        const commune = Datas.get("commune");   
        const tel = Datas.get("tel");
        const motdepasse = Datas.get("motdepasse");
        const motdepasseVerif = Datas.get("motdepasse_verif");

        console.log("Donnees recu :\n--------------");
        console.log(Datas)

        // Creation dun l objet utilisateur
        const newUser = {
          nom,
          postNom,
          prenom,
          born,
          district,
          commune,
          tel,
          motdepasse,
          motdepasseVerif,
        };

        console.log("Creation de lobjet utilisateur:\n--------------");
        console.log(newUser)


        // Lecture du fichier users
        let users = [];
        const file = await readFile("./user.json", "utf-8");
        users = JSON.parse(file);
        console.log(" fichier lu ? (ok)");


        // Ajout du nouvel utilisateur
        users.push(newUser);
        console.log("Utilisateur cree:\n--------------");
        console.log(users)

        // Sauvegarde dans users.json
        await writeFile("./user.json", JSON.stringify(users, null, 2), "utf-8");

        return new Response("✅ Utilisateur enregistré avec succès", {
          headers: { "Content-Type": "text/plain" },
      })
    }

    else if(url.pathname === "/main.html/annonces"){

      // Lecture du fichier prouitsa
      
        const filee = file("./produits.json");

        const data = await filee.json();

        return Response.json(data);

    }

    else{

      let path = url.pathname === "/" ? "/accueil.html" : url.pathname;
      const filePath = "Front" + path;
      if(existsSync(filePath)){
        return new Response(file(filePath));
        console.log(URL);
      }
    }

    return new Response(file("Front/404.html"), { status: 404 });

    
  },
});
