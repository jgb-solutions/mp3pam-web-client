import React, { ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import BaseTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface TabPanelProps {
  children: any;
  index: any;
  selected: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, selected, index } = props;

  return selected === index && children;
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export interface TabItem {
  icon?: any;
  label: string;
  value: ReactNode;
};

type TabsProps = {
  tabs: TabItem[],
  title: string,
}

export default function Tabs(props: TabsProps) {
  const { tabs, title } = props;
  const [selected, setSelected] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelected(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <BaseTabs
          value={selected}
          onChange={handleChange}
          // indicatorColor={colors.primary}
          // textColor={colors.white}
          variant="scrollable"
          scrollButtons="auto"
          aria-label={title}
        >
          {tabs.map(({ icon, label }, index) => (
            <Tab label={label} icon={icon} {...a11yProps(index)} key={index} />
          ))}
        </BaseTabs>
      </AppBar>
      {tabs.map(({ value }, index) => (
        <TabPanel
          selected={selected}
          index={index}
          key={index}>
          {value}
        </TabPanel>
      ))}
    </>
  );
}
