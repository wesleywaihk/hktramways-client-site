import { Box, Typography } from "@strapi/design-system";

// Static reference notes for editors, shown in the edit-view sidebar.
// Add/edit entries below — keyed by content-type UID, not stored in the database.
const NOTES: Record<string, string[]> = {
  "api::global.global": [],
  "api::home.home": [
    "Souvenior: \n- Only the first 5 souvenior items will be displayed.",
  ],
  "api::plan-your-ride.plan-your-ride": [
    'Service Updates: \n- The latest 3 announcements of type "news" will be rendered in the "Service Updates" section.',
  ],
  "api::party-tram.party-tram": [
    "Overlay image:\n- overlayX: counted by %, 0 if left empty.\n- overlayY: counted by %, 0 if left empty.\n- overlayW: counted by %, 100 if left empty.\n- overlayH: counted by %, auto if left empty.",
  ],
};

const NoteList = ({ notes }: { notes: string[] }) => (
  <Box>
    {notes.map((note, index) => (
      <Box key={note} paddingTop={index === 0 ? 0 : 2}>
        <Typography
          variant="pi"
          textColor="neutral700"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {note}
        </Typography>
      </Box>
    ))}
  </Box>
);

type SidePanelContext = {
  model?: string;
  layout?: { uid?: string };
};

const editorNoteSidePanel = (context: SidePanelContext) => {
  // eslint-disable-next-line no-console
  console.log("[editorNoteSidePanel] context:", context);

  const uid = context.model ?? context.layout?.uid;
  const notes = uid ? NOTES[uid] : undefined;

  if (!notes || notes.length === 0) {
    return null;
  }

  return {
    title: "Editor notes",
    content: <NoteList notes={notes} />,
  };
};

export default editorNoteSidePanel;
