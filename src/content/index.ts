const commitItems = document.querySelectorAll('.TimelineItem-body > ol > li');

const createBtn = (commitItem: HTMLLIElement) => {
  const commitSHA = commitItem.dataset.url?.split('commits/')[1].split('/')[0];
  const cherryBtn = document.createElement('button');

  cherryBtn.style.padding = '0';
  cherryBtn.style.border = '1px solid rgba(31, 35, 40, 0.15)';
  cherryBtn.style.borderRadius = '5px';
  cherryBtn.style.backgroundColor = 'rgb(246, 248, 250)';
  cherryBtn.style.margin = '0 1rem';
  cherryBtn.style.width = '28px';
  cherryBtn.style.height = '28px';

  cherryBtn.innerText = `🍒`;
  cherryBtn.onclick = () => {
    navigator.clipboard.writeText(`git cherry-pick ${commitSHA}`).then(
      () => {
        // Successful copy to  clipboard.
      },
      () => {
        alert('Failed to copy SHA');
      }
    );
  };

  return cherryBtn;
};

commitItems.forEach(commitItem => {
  const liElem = commitItem as HTMLLIElement;
  const btn = createBtn(liElem);

  liElem.style.alignItems = 'center';
  liElem.append(btn);
});
