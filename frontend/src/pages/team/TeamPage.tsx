import team from "../../assets/data/team.json";
import TeamMember from "./member/TeamMember";
import scss from "./teamPage.module.scss";

const TeamPage = () => {
  return (
    <section className={scss.root}>
      <p className={scss.description}>
        Данный сервис разработан в рамках научно-исследовательской работы
        магистров и аспирантов университета ИТМО.
      </p>
      <h2 className={scss.subtitle}>Состав научного коллектива:</h2>
      <ul className={scss.list}>
        {team.map((member) => (
          <li key={member.fullName} className={scss.item}>
            <TeamMember member={member} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeamPage;
