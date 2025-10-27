import { useEffect, useState } from "react";
import getUser from "../actions/getUser";
import { getSession, capFirstLetter } from "../utils";

const UserInfo = () => {
  const session = getSession();
  const [user, setUser] = useState(null);

  // Fetch user info
  useEffect(() => {
    if (session === null) {
      return;
    }
    const { userId, token } = session;
    getUser(userId, token).then((res) => setUser(res));
  }, [session]);

  const getName = (field) => (user === null ? "" : user[field]);

  const firstName = getName("first_name");
  const lastName = getName("last_name");

  const userName = firstName + " " + lastName;
  const userInitials = capFirstLetter(firstName) + capFirstLetter(lastName);

  return (
    <div className="ml-auto flex w-fit items-center gap-4">
      <div>
        <p className="text-right font-semibold">{userName}</p>
        <p className="text-right text-sm">Administrator</p>
      </div>
      <div className="bg-accent text-surface flex size-12 items-center justify-center rounded-full text-lg font-semibold">
        {userInitials}
      </div>
    </div>
  );
};

export default UserInfo;
