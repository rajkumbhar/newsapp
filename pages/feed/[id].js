import { Toolbar } from '../../components/toolbar';
import styles from '../../styles/Feed.module.css';
import { useRouter } from 'next/router';

export const Feed = ({ pageNumber, articles}) => {

    const router = useRouter();

    return (
        <div className="page-container">
        <Toolbar/>
            <div className={styles.main}>
                {articles.map((article, index) => (
                    article.urlToImage &&
                    <div key={index} className={styles.post}>
                        <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                        <p>{article.description}</p>
                        <img src={article.urlToImage}/>
                    </div>
                ))}
            </div>

            <div className={styles.paginator}>
                    <div 
                    onClick = {() => {
                        if (pageNumber > 1) {
                            router.push(`/feed/${pageNumber - 1}`)
                        }
                    }}
                    className={pageNumber === 1 ? styles.disabled : styles.active}> 
                    Prev
                    </div>

                    <div> {pageNumber} </div>

                    <div 
                    onClick = {() => {
                        if (pageNumber < 5) {
                            router.push(`/feed/${pageNumber + 1}`)
                        }
                    }}
                    className={pageNumber === 5 ? styles.disabled : styles.active}> 
                    Next
                    </div>
            </div>
        </div>
        
    )
}

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.id;

    if(!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props : {
                articles : [],
                pageNumber : 2
            }
        }
    }

    const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=5&page=${pageNumber}&apiKey=9de10361b26c4230bb682c4aaa9747c6`
        // {
        //     headers: {
        //         Authorization : `Bearer ${process.env.apiKey}`,
        //     },
        // },
    );

    const apiJson = await res.json();

    const { articles } = apiJson;

    return {
        props : {
            articles,
            pageNumber : Number.parseInt(pageNumber)
        }
    }
    
}

export default Feed;