import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

/**
 * FormSection Component - Individual sections within forms
 * 
 * Provides consistent spacing and typography for form sections
 * with optional titles and descriptions.
 * 
 * Usage:
 * ```tsx
 * <FormSection title="Payment Information" description="Enter your payment details">
 *   <TextField label="Card Number" />
 * </FormSection>
 * ```
 */

interface FormSectionProps {
  /** Content to render inside the section */
  children: ReactNode;
  
  /** Optional section title */
  title?: string;
  
  /** Optional section description */
  description?: string;
  
  /** Padding for the section */
  padding?: number | { xs?: number; sm?: number; md?: number };
  
  /** Gap between elements in the section */
  gap?: number;
  
  /** Additional sx props for customization */
  sx?: any;
}

export default function FormSection({
  children,
  title,
  description,
  padding = 3,
  gap = 3,
  sx = {}
}: FormSectionProps) {
  return (
    <Box sx={{
      p: padding,
      display: 'flex',
      flexDirection: 'column',
      gap,
      ...sx
    }}>
      {(title || description) && (
        <Box sx={{ mb: 1 }}>
          {title && (
            <Typography variant="h4" component="h2" sx={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'text.primary',
              mb: title && description ? 0.5 : 0
            }}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body1" sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              fontWeight: 500
            }}>
              {description}
            </Typography>
          )}
        </Box>
      )}
      
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {children}
      </Box>
    </Box>
  );
}
























