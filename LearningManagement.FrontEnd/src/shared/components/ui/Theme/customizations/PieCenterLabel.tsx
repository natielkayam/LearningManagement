import React from "react";
import { useDrawingArea } from "@mui/x-charts";
import { styled } from "@mui/material";

interface StyledTextProps {
  variant: "primary" | "secondary";
}

const StyledText = styled("text", {
  shouldForwardProp: (prop) => prop !== "variant",
})<StyledTextProps>(({ theme, variant }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fill: theme.palette.text.secondary,
  fontSize:
    variant === "primary"
      ? theme.typography.h5.fontSize
      : theme.typography.body2.fontSize,
  fontWeight:
    variant === "primary"
      ? theme.typography.h5.fontWeight
      : theme.typography.body2.fontWeight,
}));

interface Props {
  primaryText: string | number;
  secondaryText: string | number;
}

export const PieCenterLabel: React.FC<Props> = ({
  primaryText,
  secondaryText,
}) => {
  const { width, height, left, top } = useDrawingArea();
  const centerX = left + width / 2;
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <>
      <StyledText variant="primary" x={centerX} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={centerX} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </>
  );
};
