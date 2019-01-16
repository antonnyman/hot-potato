import { parse } from 'url';
import firebase, { db } from './firebase';
import { response, error } from './headers';

type User = {
  username: string;
};

async function getLobbies() {
  try {
    const lobbies: string[] = [];
    const response = await db.collection('lobbies').onSnapshot(snapshot =>
      snapshot.forEach(item => {
        return item.id;
      })
    );
    return response;
  } catch (e) {
    console.error(e);
  }
}

export default async (req: any, res: any): Promise<any> => {
  try {
    const { pathname = '/', query = {} } = parse(req.url, true);

    const { username } = query;

    console.log(firebase.SDK_VERSION);
    const lobbies = await getLobbies();
    console.log(lobbies);
    const data = await JSON.stringify({ ok: [] });
    response(res, data);
  } catch (e) {
    error(res, e);
  }
};
