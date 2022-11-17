import DiaryForm from "./DiaryForm";
import styles from "./Home.module.css";
import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";
import DiaryList from "./DiaryList";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("diary", ["uid", "==", user.uid]);

  return (
    <main className={styles.container}>
      <aside className={styles.side_menu}>
        <DiaryForm uid={user.uid}></DiaryForm>
      </aside>
      <ul className={styles.content_list}>
        {error && <strog>{error}</strog>}
        {documents && <DiaryList diaries={documents} />}
      </ul>
    </main>
  );
};

export default Home;
