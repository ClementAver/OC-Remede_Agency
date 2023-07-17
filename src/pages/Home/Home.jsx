import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";
import { useEffect } from "react";
import { postOrUpdateProfile } from "../../utils/reducers/postUserProfile.reducer";
import { updateToken } from "../../utils/reducers/postUserLogin.reducer";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    let cookieName = "token=";
    let cookieValue = "";
    if (document.cookie.length > 0) {
      let cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        if (cookie.indexOf(cookieName) !== -1) {
          cookieValue = cookie.substring(cookieName.length);
        }
      });
    }
    if (cookieValue !== "") {
      dispatch(postOrUpdateProfile(cookieValue));
      dispatch(updateToken(cookieValue));
    }
  }, [dispatch]);

  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}
