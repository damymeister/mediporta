import React from 'react';
import  TagsBrowser  from '../components/TagsBrowser';

export default {
  title: 'TagsBrowser',
  component: TagsBrowser,
  parameters: {
    componentSubtitle: 'A component for browsing tags',
  },
}

const Template = (args) => <TagsBrowser {...args} />;


export const SmallTagsBrowser = Template.bind({});

SmallTagsBrowser.args = {
    pageSize: 5,
    sortBy: 'popular',
    sortOrder: 'desc',
};

export const LargeTagsBrowser = Template.bind({});

LargeTagsBrowser.args = {
    pageSize: 30,
    sortBy: 'popular',
    sortOrder: 'desc',
};


export const SortedByNameDesc = Template.bind({});

SortedByNameDesc.args = {
    pageSize: 10,
    sortBy: 'name',
    sortOrder: 'desc',
};

export const SortedByNameAsc = Template.bind({});

SortedByNameAsc.args = {
    pageSize: 10,
    sortBy: 'name',
    sortOrder: 'asc',
};


export const SortedByActivityDesc = Template.bind({});

SortedByActivityDesc.args = {
    pageSize: 10,
    sortBy: 'activity',
    sortOrder: 'desc',
};

export const SortedByActivityAsc = Template.bind({});

SortedByActivityAsc.args = {
    pageSize: 10,
    sortBy: 'activity',
    sortOrder: 'asc',
};

