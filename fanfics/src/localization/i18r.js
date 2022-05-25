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
        "Description": "Description:",
        "Authors": "Authors",
        "Fanfics": "Fanfics",
        "Top works": "Top works",
        "Name": "Name",
        "Password": "Password",
        "Delete": "Delete",
        "Block": "Block",
        "Unblock": "Unblock",
        "Like": "Like",
        "Liked": "Likes",
        "Comment": "Comment:",
        "Create book": "Create book",
        "Title": "Title:",
        "Image": "Image:",
        "Book creation": "Book creation",
        "Send": "Send",
        "About": "About:",
        "Contacts": "Contacts:"
    }
  },
  "ru": {
    "translation": {
        "Sign in header": "Вход на сайт с книгами",
        "Categories": "Категории",
        "Fandoms"  : "Fandoms",
        "Fandom": "Фандом:",
        "Genre": "Жанр:",
        "Tags": "Теги:",
        "Description": "Описание:",
        "Authors": "Авторы",
        "Fanfics": "Фанфики",
        "Top works": "Популярные работы",
        "Name": "Имя",
        "Password": "Пароль",
        "Delete": "Удалить",
        "Block": "Заблокировать",
        "Unblock": "Разблокировать",
        "Like": "Нравится",
        "Liked": "Понравилось",
        "Comment": "Комментарий:",
        "Create book": "Создать книгу",
        "Title": "Название:",
        "Image": "Картинка:",
        "Book creation": "Создание книги",
        "Send": "Отправить",
        "About": "О себе:",
        "Contacts": "Контакты:",
        "Information": "Информация",
        "Works": "Работы",
        "Add fanfic": "Добавить фанфик",
        "Settings": "Настройки"
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