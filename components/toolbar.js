import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => {
    const router = useRouter();

    return(
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => router.push('/feed/1')}>News India</div>
            <div onClick={() => router.push('/feedus/1')}>News US</div>
            {/* <div onClick={() => router.push('/profile')}>Profile</div>
            <div onClick={() => window.location.href='https://www.twitter.com/rajkumbrk'}>Twitter</div> */}
        </div>
    );
}