import "./home.css"
import NavbarHome from "../../components/navbarHome/Navbar"
import Header from "../../components/header/Header"
import Featured from "../../components/featured/Featured"
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties"
import FeaturedBoats from "../../components/featured/featuredBoats"
import FeaturedPropertiesBoats from "../../components/featuredProperties/featuredPropertiesBoats"
import FeaturedAdventures from "../../components/featured/FeaturedAdventures"
import FeaturedPropertiesAdventures from "../../components/featuredProperties/FeaturedPropertiesAdventures"
import Calendar from "../../dashboard/components/calendar/Calendar"
import Footer from "../../components/footer/Footer"

const Home = ({page = "1"}) => {


    return ( 
        <div>
            <NavbarHome/>
            <Header activePage={page} />
            { page ==="1"?
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">Cottages guests love</h1>
                <FeaturedProperties />
            </div>
            : 
            page ==="2"?
            <div className="homeContainer">
            <FeaturedBoats />
            <h1 className="homeTitle">Boats guests love</h1>
            <FeaturedPropertiesBoats/>
            </div>
            :
            <div className="homeContainer">
            <FeaturedAdventures />
            <h1 className="homeTitle">Adventures guests love</h1>
            <FeaturedPropertiesAdventures/>
            </div>
            }
            <Footer/>
           
        </div>
     );
}
 
export default Home;