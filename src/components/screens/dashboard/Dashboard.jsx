import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../loader/Loader";
import Layout from "../../layout/Layout";
import styles from "./Dashboard.module.scss";
import dataService from "../../../services/data.service";
import { AiOutlineSearch } from "react-icons/ai";
import UserItem from "./user/UserItem";
import { useState } from "react";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

const Dashboard = () => {
  const { isLoading, error, data } = useQuery(
    ["all data"],
    () => dataService.getAll(),
    {
      select: ({ data }) => data,
    }
  );

  const [isUser, setIsUser] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [per, setPer] = useState("");
  const [image, setImage] = useState("");

  const { mutate } = useMutation(["create user"], () =>
    dataService.create({
      id: data.length + 1,
      name: name,
      email: email,
      permissions: per.split(","),
      image: image,
    })
  );

  const handleAdd = () => {
    mutate();
    location.reload();
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "25px",
      background: "#F9FAFB",
      padding: "60px",
      border: "none",
      boxShadow: "0px 0px 20px 4px rgba(28, 28, 30, 0.1)",
    },
  };

  return (
    <>
      {isLoading || error ? (
        <Loader />
      ) : (
        <Layout>
          <div className={styles.dashboard}>
            <div className={styles.container}>
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <h2>Команда</h2>
                </div>
                <div className={styles.headerRight}>
                  <AiOutlineSearch fontSize={24} fill="#9494A0" />
                  <button onClick={() => setIsUser(true)}>
                    Добавить пользователя
                  </button>
                </div>
              </div>

              <div className={styles.line}></div>

              <div className={styles.users}>
                {data.map((user) => (
                  <UserItem user={user} key={user.id} />
                ))}
              </div>

              <ReactModal
                ariaHideApp={false}
                isOpen={isUser}
                onRequestClose={() => setIsUser(false)}
                style={customStyles}
              >
                <div className={styles.modal}>
                  <h2>Добавить пользователя</h2>
                  <button
                    onClick={() => setIsUser(true)}
                    className={styles.modalClose}
                  >
                    <AiOutlineClose fontSize={24} />
                  </button>
                  <label htmlFor="text">Имя</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="per">Способности (через запятую)</label>
                  <input
                    id="per"
                    type="text"
                    value={per}
                    onChange={(e) => setPer(e.target.value)}
                  />
                  <label htmlFor="image">Изображение</label>
                  <input
                    id="image"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <button
                    className={styles.modalButton}
                    onClick={() => handleAdd()}
                  >
                    Изменить
                  </button>
                </div>
              </ReactModal>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Dashboard;
