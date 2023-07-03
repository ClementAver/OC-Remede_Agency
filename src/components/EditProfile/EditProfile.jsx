import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";

import { putOrUpdateEditProfile } from "../../utils/reducers/putUserProfile.reducer";
import { postOrUpdateProfile } from "../../utils/reducers/postUserProfile.reducer";

export default function EditProfile() {
  const dispatch = useDispatch();
  const [deployed, setDeployed] = useState(false);

  const handleDeploy = () => {
    setDeployed(!deployed);
  };

  const handleSave = async () => {
    dispatch(putOrUpdateEditProfile);
    dispatch(postOrUpdateProfile);
    setDeployed(!deployed);
  };

  return (
    <section className="edit-profile">
      <Button
        type="button"
        className="edit-button"
        text="Edit Name"
        onClick={handleDeploy}
      />
      {deployed ? (
        <form>
          <div>
            <input
              type="text"
              name="firstname"
              id="firstname"
            ></input>
            <input
              type="text"
              name="lastname"
              id="lastname"
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
