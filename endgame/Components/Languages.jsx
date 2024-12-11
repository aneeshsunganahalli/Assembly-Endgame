import { languages } from "../src/languages";

export default function Languages(){

  const languageChips = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return (
    <span className="chip" key={lang.name} style={styles}>{lang.name}</span>
    )
  })

    return(
      <div className="language-chips">
        {languageChips}
      </div>
    )
}