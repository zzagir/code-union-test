/* eslint-disable react/prop-types */
import styles from "./UserItem.module.scss";
import cn from "clsx";
import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import { useClickAway } from "@uidotdev/usehooks";
import dataService from "../../../../services/data.service";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

const UserItem = ({ user }) => {
  const [isShow, setIsShow] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image);

  const ref = useClickAway(() => {
    setIsShow(false);
  });

  const handleRemove = (id) => {
    dataService.delete(id);
    location.reload();
  };

  const handleUpdate = (id) => {
    dataService.update(id, {
      id: user.id,
      name: name,
      email: email,
      permissions: user.permissions,
      image: image,
    });
    location.reload();
  };

  function closeModal() {
    setIsModal(false);
    setIsUser(false);
  }

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
    <div className={styles.user}>
      <img src={user.image} alt={user.name} className={styles.image} />
      <div className={styles.texts}>
        <div className={styles.textUp}>
          <h2>{user.name}</h2>
          <span>{user.email}</span>
        </div>
        <div className={styles.textDown}>
          {user.permissions?.map((per) => (
            <span
              key={per}
              className={cn(styles.per, {
                [styles.perAdmin]: per == "Администратор",
              })}
            >
              {per}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        <button onClick={() => setIsShow(!isShow)}>
          <BsThreeDots className={styles.dot} fill="#C1C1CB" fontSize={24} />
        </button>
        <div ref={ref}>
          {isShow ? (
            <div className={styles.menu}>
              <button onClick={() => setIsModal(true)}>Изменить</button>
              <button onClick={() => handleRemove(user.id)}>Удалить</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <ReactModal
        ariaHideApp={false}
        isOpen={isModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className={styles.modal}>
          <h2>Изменить пользователя с id {user.id}</h2>
          <button onClick={closeModal} className={styles.modalClose}>
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
          <label htmlFor="image">Изображение</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button
            className={styles.modalButton}
            onClick={() => handleUpdate(user.id)}
          >
            Изменить
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default UserItem;
