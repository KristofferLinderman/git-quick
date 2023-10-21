console.log('content loaded');

const commitItems = document.querySelectorAll('.TimelineItem-body > ol > li');
console.log('🚀 ~ file: index.ts:4 ~ commitItems:', commitItems);


commitItems.forEach(commitItem => {
  const test = document.createElement('button');
  test.innerText = "Test";
  commitItem.appendChild(test);
});

///KristofferLinderman/git-quick/commits/b28366ec34dcc69af33671bdb74b4bea86b2bc1c/commits_list_item
