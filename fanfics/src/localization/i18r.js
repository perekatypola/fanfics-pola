import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources  = {
  "en": {
    "translation": {
        "Sign in header": "Sign in to fanficbook",
        "Categories": "Categories",
        "Fandoms"  : "Фандомы",
        "Fandom": "Fandom:",
        "Genre": "Genre:",
        "Tags": "Tags:",
        "Description": "Description:"
    }
  },
  "ru": {
    "translation": {
        "Sign in header": "Вход на сайт с книгами",
        "Categories": "Категории",
        "Fandoms"  : "Фандомы",
        "Fandom": "Фандом:",
        "Genre": "Жанр:",
        "Tags": "Теги:",
        "Description": "Описание:"

    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    lng: "ru",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;