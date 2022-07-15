import scss from "./networksList.module.scss";

const NetworksList = () => {
  return (
    <div className={scss.root}>
      <p className={scss.title}>Name</p>
      <div className={scss.list}></div>
    </div>
  );
};

export default NetworksList;
