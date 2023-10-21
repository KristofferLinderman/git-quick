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
        cherryBtn.innerHTML =
          '<svg style="display: inline-block;" aria-hidden="false" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check color-fg-success"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>';

        setTimeout(() => {
          cherryBtn.innerText = `🍒`;
        }, 1000);
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
