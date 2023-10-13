import Container from "../Shared/Container";
import CategoryBox from "./CategoryBox";
import {categories} from './categorisData.js'
const Categories = () => {
    return (
        <Container>
      
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
         {categories.map(item =>
            <CategoryBox label={item.label} icon={item.icon} description={item.description} key={item.label}></CategoryBox>
             )}
        </div>
        </Container>
    );
};

export default Categories;