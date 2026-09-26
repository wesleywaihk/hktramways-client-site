import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RichText from "@/components/RichText/RichText";
import { devClassName } from "@/lib/devClassName";
import { mediaSrc } from "@/lib/media";
import type { AccordionItemData } from "@/types/api";

export default function AboutDetailsAccordion({
  items,
}: {
  items: AccordionItemData[];
}) {
  if (!items.length) return null;

  return (
    <div
      className={`${devClassName("about-details-accordion")}border-t border-white/30`}
    >
      {items.map((item) => (
        <Accordion
          key={item.id}
          disableGutters
          elevation={0}
          square
          sx={{
            bgcolor: "transparent",
            color: "inherit",
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            "&::before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "inherit" }} />}
            sx={{
              px: 0,
              "& .MuiAccordionSummary-content": {
                alignItems: "center",
                gap: "25px",
                my: "20px",
              },
              "& .MuiAccordionSummary-expandIconWrapper": { color: "inherit" },
            }}
          >
            {item.icon?.url && (
              <Image
                src={mediaSrc(item.icon.url)}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 shrink-0 object-contain"
              />
            )}
            <span className="text-[18px] leading-[152.4%] font-semibold tracking-[0.02em]">
              {item.title}
            </span>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 0, pb: "20px" }}>
            <RichText className="text-white/90">{item.content}</RichText>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
