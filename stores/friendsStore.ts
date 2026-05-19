import { create } from 'zustand';

type FriendsStore = {
  friends: any[];
  setFriends: (friends: any[]) => void;
};

export const useFriendsStore = create<FriendsStore>((set) => ({
  friends: [],
  setFriends: (friends) => set({ friends }),
}));
