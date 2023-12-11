import dialogsReducer from "./dialogs-reducer";
import newsReducer from "./news-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "Hello", like: '103' },
                { id: 2, message: "Bye", like: '133' },
            ],
            newPostText: 'Sanka',
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Sana' },
                { id: 2, name: 'Kirill' },
                { id: 3, name: 'Maksim' },
                { id: 4, name: 'Denis' },
            ],

            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'Hi' },
                { id: 3, message: 'Hi' },
                { id: 4, message: 'Hi' },
            ],
            newMessageBody: 'Sanka',

        },
        newsPage: {
            news: [
                {
                    id: 1, img: "https://sun87-1.userapi.com/impg/Ut4cw-nSS5bCwHsH2xpgsTY9a_4i13vtoItv3A/MTEkt9PW2Mk.jpg?size=2316x2316&quality=95&sign=d2d7437a9bb9ba29f125d613b081eac5&type=album",
                    like: '123', comment: ["Лучшая девочка!"]
                },
                {
                    id: 2, img: "https://sun9-30.userapi.com/impg/81qt3fvtxIzRFmEA0_ZApqXRK0FqHWfn3h4F5A/b0tZsH4WQtg.jpg?size=1620x2160&quality=95&sign=c6c89cde44461ff832d5978ff9a5242c&type=album",
                    like: '193', comment: ["Попка супер, малышка)))", "Красивый фон, красивая девушка. Я хочу побывать с тобой там"]
                },
            ],
            newNewText: 'beautiful',
        }
    },
    _callSubscriber() {
        console.log('sdfsdf')
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.newsPage = newsReducer(this._state.newsPage, action);

        this._callSubscriber(this._state);

    }
}


window.store = store;