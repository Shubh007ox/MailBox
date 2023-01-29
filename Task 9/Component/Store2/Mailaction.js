import { handleEmailActions } from "./sentMail-Reducer";
import axios from "axios";

 
export const MailactionMaker = () => {
    const Email = localStorage.getItem("enteredEmail");
    const Email1 = Email.replace("@", "");
    const Email2 = Email1.replace(".", "");

    console.log('mail')
    return async (dispatch) => {
        const fetchData =  async () => {
            try{
                let res = await axios.get(
                    `https://authentication-61603-default-rtdb.firebaseio.com/receive${Email2}.json`
                );
                console.log(res, 'mailAc')
                dispatch(handleEmailActions.setReceiveMail(res.data));
            }
            catch (error) {
                alert('There is an error!!')
                console.log(error)
            }
        }
        fetchData()
    };
};