type TreeCardProps = {
  name: string;
  price: number;
  image: string;
  localization: string;
  project_name: string;
}

function HomePageTreeCard ({ name, price, image, localization, project_name }: TreeCardProps) {
    return (
        <div className="tree-card">
        <img src={image} alt={name} style={{ width: "100%", height: "auto" }} />
        <h3>{name}</h3>
        <p>Prix : {price} €</p>
        <p>Localisation : {localization}</p>
        <p>Projet : {project_name}</p>
    </div>
    );
};

export default HomePageTreeCard;