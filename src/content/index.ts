const commitItems = document.querySelectorAll('.TimelineItem-body > ol > li');

type BtnIcons = '🍒' | '🔄';

const WRAPPER_ID = 'git-quick-wrapper';

const copySHA = (
  cherryBtn: HTMLButtonElement,
  commitSHA: string,
  btnIcon: BtnIcons
) => {
  navigator.clipboard.writeText(`git cherry-pick ${commitSHA}`).then(
    () => {
      // Successful copy to  clipboard.
      cherryBtn.innerHTML =
        '<svg style="display: inline-block;" aria-hidden="false" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check color-fg-success"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>';

      setTimeout(() => {
        cherryBtn.innerText = btnIcon;
      }, 1000);
    },
    () => {
      alert('Failed to copy SHA');
    }
  );
};

const createBtn = (commitSHA: string, icon: BtnIcons, title: string) => {
  const cherryBtn = document.createElement('button');
  cherryBtn.id = `${title}-${commitSHA}`;

  cherryBtn.style.padding = '0';
  cherryBtn.style.border = '1px solid rgba(31, 35, 40, 0.15)';
  cherryBtn.style.borderRadius = '5px';
  cherryBtn.style.backgroundColor = 'rgb(246, 248, 250)';
  cherryBtn.style.width = '28px';
  cherryBtn.style.height = '28px';

  cherryBtn.title = title;
  cherryBtn.innerText = icon;
  cherryBtn.onclick = () => copySHA(cherryBtn, commitSHA, icon);

  return cherryBtn;
};

const CreateWrapper = (wrapperId: string) => {
  const existingWrapper = document.getElementById(wrapperId);
  console.log(
    '🐼 ~ file: index.ts:48 ~ CreateWrapper ~ existingWrapper:',
    existingWrapper
  );
  if (existingWrapper) {
    existingWrapper.innerHTML = '';
    return existingWrapper;
  }
  const wrapper = document.createElement('div');

  wrapper.style.display = 'flex';
  wrapper.style.marginLeft = '2rem';
  wrapper.style.gap = '.5rem';
  wrapper.style.opacity = '0';
  wrapper.style.transform = 'translateY(10px)';
  wrapper.style.transition = 'all 1s ease-in-out';

  wrapper.id = wrapperId;

  return wrapper;
};

let shouldShowCherry: boolean = false;
let shouldShowRevert: boolean = false;

chrome.storage.sync.get('cherry', data => {
  shouldShowCherry = !!data;
});
chrome.storage.sync.get('revert', data => {
  shouldShowRevert = !!data;
});

const handleStorageChange = (event: {
  [key: string]: chrome.storage.StorageChange;
}) => {
  if (Object.keys(event).includes('cherry')) {
    shouldShowCherry = event.cherry.newValue;
    console.log('🐼 ~ file: index.ts:76 ~ shouldShowCherry:', shouldShowCherry);
    renderButtons();
  } else if (Object.keys(event).includes('revert')) {
    shouldShowRevert = event.revert.newValue;
    console.log('🐼 ~ file: index.ts:80 ~ shouldShowRevert:', shouldShowRevert);
    renderButtons();
  }
};
chrome.storage.onChanged.addListener(handleStorageChange);

const main = () => {
  isRunning = true;
  if (document.getElementById('git-quick-wrapper')) {
    return;
  }
  renderButtons();
};

const renderButtons = () => {
  const commitItems = document.querySelectorAll('.TimelineItem-body > ol > li');

  commitItems.forEach(commitItem => {
    const liElem = commitItem as HTMLLIElement;
    const commitSHA = liElem.dataset.url?.split('commits/')[1].split('/')[0];

    if (!commitSHA || (!shouldShowCherry && !shouldShowRevert)) {
      return;
    }

    const wrapper = CreateWrapper(`${WRAPPER_ID}-${commitSHA.substring(0, 5)}`);

    if (
      shouldShowCherry &&
      document.getElementById(`cherry-Pick-${commitSHA}`) === null
    ) {
      const cherryBtn = createBtn(commitSHA, '🍒', 'Cherry-Pick');
      wrapper.append(cherryBtn);
    }

    if (
      shouldShowRevert &&
      document.getElementById(`revert-${commitSHA}`) === null
    ) {
      const revertBtn = createBtn(commitSHA, '🔄', 'Revert');
      wrapper.append(revertBtn);
    }

    liElem.style.alignItems = 'center';
    liElem.append(wrapper);

    setTimeout(() => {
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'translateY(0)';
    }, 0);
  });
};

let previousUrl: string = '';
let isRunning = false;
let hasWrapper = false;

setInterval(() => {
  const currentURL = window.location.href;
  if (currentURL === previousUrl) {
    return;
  }
  previousUrl = currentURL;

  if (currentURL.includes('/commits/')) {
    main();
  }
}, 200);
