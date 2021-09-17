import { Toolbar } from '../components/toolbar';
import styles from '../styles/Profile.module.css';

export const ProfilePage = ({profile}) => {


    return (
        <>
            <Toolbar/>
            <div className="page-container">
            <div>
                <h1 className={styles.main}>My Profile</h1>
                <div className={styles.profile}>
                    <h1>{profile.name}</h1>
                    <img src={profile.image}/>
                    <h1>{profile.bio}</h1>
                </div>
            </div>
            </div> 
        </>
    );
 };

 //When you wanna render the page server side which is the speciallity of next js
 //then you just have to write following code after export function 

 export const getServerSideProps = async pageContext => {
     //fetch the data from database
     const res = await fetch(
         'https://my-json-server.typicode.com/rajkumbhar/mockdb/profile',
     );

     //get the data into variable
     const profile = await res.json();

     //pass the data as a props into the function
     return {
         props:{
            profile
         }
     }
 }

 export default ProfilePage;