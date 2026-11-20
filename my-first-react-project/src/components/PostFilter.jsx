import React from "react";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <MyInput 
        value={filter.searchQuery}
        onChange={e => setFilter({...filter, searchQuery: e.target.value})}
        type="text"
        placeholder="Поиск..." />
      <MySelect 
        value={filter.selectedSort}
        defaultValue="Сортировать по " 
        options={[
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По описанию' }
        ]} 
        onChange={sort => setFilter({...filter, selectedSort: sort})}
      />
    </div>
  );
};

export default PostFilter;