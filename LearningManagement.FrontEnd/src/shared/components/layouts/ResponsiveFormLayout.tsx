import { Box, Paper, type PaperProps } from "@mui/material";
import type { ReactNode } from "react";

/**
 * ResponsiveFormLayout Component - Universal form layout for all forms
 * 
 * This component provides a standardized layout for ALL forms in the application
 * with consistent spacing, borders, and responsive behavior.
 * 
 * Features:
 * - Single column layout for simple forms
 * - Two-column responsive layout for complex forms (checkout, plan config, etc.)
 * - Responsive maxWidth that adapts to screen size (default: 100% on all screens)
 * - Responsive minHeight that scales with device size (300px mobile → 700px desktop)
 * - Consistent proportions (60%/40% on medium, 66.7%/33.3% on large)
 * - Glass-morphism styling with backdrop blur
 * - Mobile-first responsive design
 * - Responsive padding that scales with screen size
 * - Universal component that works for forms, admin interfaces, data tables, etc.
 * 
 * Usage:
 * ```tsx
 * // Single column layout (default)
 * <ResponsiveFormLayout>
 *   <FormSection title="Personal Information">
 *     <TextField label="Name" />
 *   </FormSection>
 * </ResponsiveFormLayout>
 * 
 * // Two-column responsive layout
 * <ResponsiveFormLayout layout="two-column">
 *   <FormSection title="Payment">
 *     <PaymentForm />
 *   </FormSection>
 *   <Box>Order Summary</Box>
 * </ResponsiveFormLayout>
 * 
 * // Default responsive behavior (full width + responsive minHeight)
 * <ResponsiveFormLayout>
 *   <FormSection title="Admin Actions">
 *     <AdminActions />
 *   </FormSection>
 * </ResponsiveFormLayout>
 * // Default minHeight: 300px mobile → 700px desktop
 * 
 * // Custom responsive maxWidth
 * <ResponsiveFormLayout maxWidth={{ xs: '100%', sm: '90%', md: '1200px', lg: '1400px' }}>
 *   <FormSection title="Custom Layout">
 *     <Content />
 *   </FormSection>
 * </ResponsiveFormLayout>
 * 
 * // Fixed maxWidth
 * <ResponsiveFormLayout maxWidth="1200px">
 *   <FormSection title="Fixed Width">
 *     <Content />
 *   </FormSection>
 * </ResponsiveFormLayout>
 * 
 * // Custom minHeight
 * <ResponsiveFormLayout minHeight="400px">
 *   <FormSection title="Minimum Height">
 *     <Content />
 *   </FormSection>
 * </ResponsiveFormLayout>
 * 
 * // Responsive minHeight
 * <ResponsiveFormLayout minHeight={{ xs: '300px', md: '500px', lg: '600px' }}>
 *   <FormSection title="Responsive Height">
 *     <Content />
 *   </FormSection>
 * </ResponsiveFormLayout>
 * ```
 */

interface ResponsiveFormLayoutProps {
  /** Content to render inside the form */
  children: ReactNode;
  
  /** Maximum width of the form container - can be responsive object or single value */
  maxWidth?: string | number | { xs?: string | number; sm?: string | number; md?: string | number; lg?: string | number; xl?: string | number };
  
  /** Minimum height of the form container - can be responsive object or single value */
  minHeight?: string | number | { xs?: string | number; sm?: string | number; md?: string | number; lg?: string | number; xl?: string | number };
  
  /** Additional sx props for customization */
  sx?: PaperProps['sx'];
  
  /** Whether to show the form container background */
  showBackground?: boolean;
  
  /** Custom background color */
  backgroundColor?: string;
  
  /** Layout mode - 'single' for single column, 'two-column' for responsive grid */
  layout?: 'single' | 'two-column';
}

export default function ResponsiveFormLayout({
  children,
  maxWidth = {
    xs: '100%',    // Full width on mobile
    sm: '100%',    // Full width on small tablets
    md: '100%',    // Full width on medium screens
    lg: '100%',    // Full width on large screens
    xl: '100%'     // Full width on extra large screens
  },
  minHeight = {
    xs: '300px',   // Mobile: Compact but usable
    sm: '400px',   // Tablet: Comfortable touch interface
    md: '500px',   // Laptop: Standard form height
    lg: '600px',  // Desktop: Full-featured interface
    xl: '700px'   // Large desktop: Data-heavy applications
  },
  sx = {},
  showBackground = true,
  backgroundColor = 'rgba(255, 255, 255, 0.05)',
  layout = 'single',
}: ResponsiveFormLayoutProps) {
  const containerStyles = {
    maxWidth: maxWidth,
    minHeight: minHeight,
    width: '100%',
    mx: 'auto',
    px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }, // Responsive padding
    py: 4
  };

  const paperStyles = {
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    bgcolor: showBackground ? backgroundColor : 'transparent',
    backdropFilter: 'blur(4px)',
    p: 0,
    width: '100%',
    minHeight: minHeight,
    ...sx
  };

  // For single layout, use the same width behavior as two-column
  if (layout === 'single') {
    return (
      <Box sx={{
        ...containerStyles,
      }}>
        <Paper sx={paperStyles}>
          {children}
        </Paper>
      </Box>
    );
  }

  // For two-column layout, use the responsive grid structure
  return (
    <Box sx={containerStyles}>
      <Paper sx={paperStyles}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            md: '3fr 2fr', // 60%/40% ratio
            lg: '2fr 1fr'  // 66.7%/33.3% ratio
          },
          minHeight: minHeight
        }}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}

