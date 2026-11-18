export type Journal = {
  journal_id: number;
  title: string;
  content: string;
  created_at: string;
};

export type JournalStore = {
  journals: Journal[];

  createJournalLoading: boolean;
  createJournalError: string | null;

  createJournal: (title: string, content: string) => Promise<boolean>;
};
