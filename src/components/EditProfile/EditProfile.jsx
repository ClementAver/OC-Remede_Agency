import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";

import { putOrUpdateEditProfile } from "../../utils/reducers/putUserProfile.reducer";
import { postOrUpdateProfile } from "../../utils/reducers/postUserProfile.reducer";

export default function EditProfile() {
  const dispatch = useDispatch();
  const [deployed, setDeployed] = useState(false);

  const editedBody = useSelector((state) => state.editProfile.data.body);

  const firstNameInput = useRef();
  const lastNameInput = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleDeploy = () => {
    setDeployed(!deployed);
  };

  const handleFirstName = () => {
    setFirstName(firstNameInput.current.value);
  };

  const handleLastName = () => {
    setLastName(lastNameInput.current.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    dispatch(putOrUpdateEditProfile(firstName, lastName));
    // bug ici
    setDeployed(!deployed);
  };

  useEffect(() => {
    dispatch(postOrUpdateProfile());
  }, [dispatch, editedBody]);

  return (
    <section className="edit-profile">
      <Button
        type="button"
        className="edit-button"
        text="Edit Name"
        onClick={handleDeploy}
      />
      {deployed ? (
        <form onSubmit={handleSave}>
          <div>
            <input
              type="text"
              name="firstname"
              id="firstname"
              ref={firstNameInput}
              onChange={handleFirstName}
              value={firstName}
            ></input>
            <input
              type="text"
              name="lastname"
              id="lastname"
              ref={lastNameInput}
              onChange={handleLastName}
              value={lastName}
            ></input>
          </div>
          <div>
            <Button
              type="submit"
              className="edit-button"
              text="Save"
              onClick={handleSave}
            />
            <Button
              type="button"
              className="edit-button"
              text="Cancel"
              onClick={handleDeploy}
            />
          </div>
        </form>
      ) : null}
    </section>
  );
}
