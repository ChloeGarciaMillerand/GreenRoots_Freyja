import { Link } from "react-router";
import type { Route } from "./+types/home";

import homePageSeed from "./images/homePage_seed_growing.webp";

import trees from "./data/data";
import HomePageTreeCard from "./HomePageTreeCard/HomePageTreeCard";
import type { Key } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GreenRoots - plantez des arbres pour lutter contre la déforestation" },
    { name: "description", content: "Parrainez un arbre dans un de nos projets de notre reforestation à travers le monde" },
  ];
}

export async function loader() {
  return {trees};
}

export default function Home(props: Route.ComponentProps) {
  const {loaderData} = props;
  return (
    <main>
        <section className="hero-section">
            <h1>
              Participez à la reforestation avec <span>GreenRoots</span>
            </h1>
        </section>
          <img src={homePageSeed} alt="graine poussant dans la forêt" />
          <div>
            <p>Partout dans le monde, nos projets revitalisent la planète!</p>
            <p>make our planet green again!</p>
            <Link to="" className="link-button">Voir tous nos arbres</Link>
          </div>
        <section>
            <h2>Nos arbres autour du monde</h2>
            <div className="tree-card-container">
              <ul>
                {loaderData.trees.map((tree: { tree_id: Key | null | undefined; name: string; price: number; image: string; localization: string; project_name: string; }) => (
                  <li key={tree.tree_id}>
                    <HomePageTreeCard 
                      name={tree.name}
                      price={tree.price}
                      image={tree.image}
                      localization={tree.localization}
                      project_name={tree.project_name}
                    />
                  </li>
                ))}
              </ul>
            </div>
        </section>
    </main>
  )
}
