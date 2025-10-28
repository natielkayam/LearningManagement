import { Box, Tabs as MuiTabs, Tab as MuiTab } from "@mui/material";
import { useState, type ReactNode } from "react";

export interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  ariaLabel: string;
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${index}-tabpanel`}
      aria-labelledby={`${index}-tab`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `${index}-tab`,
    'aria-controls': `${index}-tabpanel`,
  };
}

export function Tabs({ tabs, ariaLabel }: TabsProps) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label={ariaLabel}
          sx={{
            '& .MuiTab-root': {
              fontSize: '1rem',
              padding: '10px',
            },
            '& .MuiTabs-indicator': {
              height: '2px',
            },
          }}
        >
          {tabs.map((tab, index) => (
            <MuiTab 
              key={index}
              label={tab.label} 
              {...a11yProps(index)} 
            />
          ))}
        </MuiTabs>
      </Box>
      
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={tabValue} index={index}>
            {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
}
