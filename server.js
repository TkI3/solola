import { serve, file , write } from "bun";
import { existsSync } from "fs";
import { readFile, writeFile } from "node:fs/promises";

let id_compt = Date.now(); 

function getAnId(){
  id_compt++;
  console.log(id_compt);
  return id_compt;
}

serve({

  port: 3000,
  hostname: "localhost",

  routes:{
    
    "/Annonces-img/*": req => {const url = new URL(req.url);  return new Response(file(`.${url.pathname}`))},
   
  },

  async fetch(req) {

    const url = new URL(req.url);
    

    if (url.pathname === "/auth" && req.method === "POST") {
      try {
        
        const formDatas = await req.formData();
        const tel = formDatas.get("numero");
        const motdepasse = formDatas.get("motdepasse");
        
        const usersFile = await readFile("./user.json", "utf-8");
        const users = JSON.parse(usersFile);

        const found = users.find(
          (u) => u.tel === tel && u.motdepasse === motdepasse
        );
        
        if (found) {

          const { motdepasse, ...userWithoutPassword } = found;
          const cookieValue = encodeURIComponent(JSON.stringify(userWithoutPassword));

        return new Response( null, {
          status:302,
          headers: {
            "location":"html/connexion-reusssi.html",
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
      
        const filee = file("./annonces.json");

        const data = await filee.json();

        return Response.json(data);

    }

    else if(url.pathname === "/annonce"){

      console.log("ok");
      const id = url.searchParams.get("id");

      let annonces = await readFile("./annonces.json");
      let annonce_parse = JSON.parse(annonces);
      
      let found = annonce_parse.find( anc => anc.id == id);

      if(!found){
        return new Response(file("Front/html/404.html"), { status: 404 });
      }

      console.log(found);

      let html = await file("./Front/html/Template.html").text();
      html = html.replaceAll("{titre}",found.titre);
      html = html.replaceAll("{id}",found.id)
      html = html.replaceAll("{prix}",found.prix);
      html = html.replaceAll("{description}",found.description);
      html = html.replaceAll("{district}",found.district);
      html = html.replaceAll("{commune}",found.commune);


      return new Response(html,{headers:{"content-Type":"html"}})

    }

    else if(url.pathname === "/upload"){

      const Datas = await req.formData();
      const img = Datas.getAll("images");

      //extraction des donnees du formulaire recu dans la requete
        const id = getAnId();
        const titre = Datas.get("titre");
        const prix = Datas.get("prix");
        const categorie = Datas.get("categorie");
        const district = Datas.get("district"); 
        const commune = Datas.get("commune");   
        const description = Datas.get("description");
        const preview = `/Annonces-img/${id}-0.png`;
        
        

      //Enregistrement des images recu
        let i  = 0 ;
        img.forEach( img_recu => {

          if( i < 3 ){
            write(`Annonces-img/${id}-${i}.png`,img_recu);
            i++;
          }
          
        });

      //Creation de l'annonce  
        const newAnc = {
          id,
          titre,
          prix,
          categorie,
          district,
          commune,
          description,
          preview
        };

      // Lecture du fichier d'annonce
        let annonces = [];
        const file = await readFile("./annonces.json", "utf-8");
        annonces = JSON.parse(file);
        console.log(" fichier lu ? (ok)");


        // Ajout de la nouvelle annonce 
          annonces.unshift(newAnc);
          console.log("Annonces cree:\n--------------");
          console.log(annonces)

        // Sauvegarde dans annonces.json 
        await writeFile("./annonces.json", JSON.stringify(annonces),"utf-8");

      return new Response("ok") ;
    }

    else {
      let path = url.pathname === "/" ? "html/accueil.html" : url.pathname;
      const filePath = "Front/" + path;
      if(existsSync(filePath)){
        return new Response(file(filePath));
        console.log(URL);
      }
    }

    return new Response(file("Front/html/404.html"), { status: 404 });

    
  },
});
