/* Presentation helpers only. The original selects and grading handlers stay authoritative. */
(() => {
  let observer, activeDialog;
  window.VL_QUESTIONS = {
    reset() {
      if (observer) observer.disconnect();
      if (activeDialog) { activeDialog.close(); activeDialog = null; }
    },
    enhance(root, { onInspect } = {}) {
      this.reset();
      const diagrams = [...root.querySelectorAll('.st-opts.vis .st-opt')];
      if (diagrams.length) {
        const enlarge = document.createElement('button');
        enlarge.type = 'button'; enlarge.className = 'qenlarge'; enlarge.textContent = 'Enlarge diagrams';
        root.querySelector('.qskip-inline').after(enlarge);
        enlarge.onclick = () => {
          if (onInspect) onInspect();
          const dialog = document.createElement('dialog');
          activeDialog = dialog;
          dialog.className = 'qdiagram-dialog'; dialog.setAttribute('aria-label', 'Enlarged question diagrams');
          const close = document.createElement('button');
          close.type = 'button'; close.className = 'qdiagram-close'; close.textContent = 'Close enlarged view';
          close.onclick = () => dialog.close(); dialog.appendChild(close);
          diagrams.forEach(option => {
            const figure = document.createElement('figure'), caption = document.createElement('figcaption');
            caption.textContent = option.getAttribute('aria-label');
            const drawing = document.createElement('div'); drawing.className = 'qdiagram-pan'; drawing.tabIndex = 0;
            drawing.setAttribute('aria-label', caption.textContent + '. Scroll to inspect the enlarged drawing.');
            drawing.appendChild(option.querySelector('.dgo').cloneNode(true));
            figure.append(caption, drawing); dialog.appendChild(figure);
          });
          dialog.onclose = () => { dialog.remove(); if (activeDialog === dialog) activeDialog = null; if (enlarge.isConnected) enlarge.focus({ preventScroll: true }); };
          document.body.appendChild(dialog); dialog.showModal(); close.focus();
        };
      }
      root.querySelectorAll('select.qsel').forEach(select => {
        const picker = document.createElement('details');
        picker.className = 'qpick';
        const summary = document.createElement('summary');
        summary.setAttribute('aria-label', select.getAttribute('aria-label') + ': choose…');
        const choices = document.createElement('div');
        choices.className = 'qchoices';
        choices.setAttribute('role', 'group');
        choices.setAttribute('aria-label', select.getAttribute('aria-label') + ' options');
        const sync = () => {
          summary.textContent = select.selectedOptions[0].textContent;
          summary.setAttribute('aria-label', select.getAttribute('aria-label') + ': ' + summary.textContent);
          summary.setAttribute('aria-disabled', String(select.disabled));
          summary.tabIndex = select.disabled ? -1 : 0;
          if (select.disabled) picker.open = false;
        };
        for (const option of [...select.options].slice(1)) {
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = option.textContent;
          button.onclick = () => {
            if (select.disabled) return;
            select.value = option.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            sync(); picker.open = false; summary.focus();
          };
          choices.appendChild(button);
        }
        summary.onclick = event => { if (select.disabled) event.preventDefault(); };
        picker.onkeydown = event => {
          if (event.key === 'Escape') { picker.open = false; summary.focus(); event.stopPropagation(); }
        };
        select.before(picker);
        picker.append(summary, select, choices);
        select.hidden = true;
        select.addEventListener('change', sync);
        select._syncPicker = sync;
        sync();
      });
      observer = new MutationObserver(() => root.querySelectorAll('select.qsel').forEach(s => s._syncPicker?.()));
      observer.observe(root, { subtree: true, attributes: true, attributeFilter: ['disabled'] });
    }
  };
  document.addEventListener('click', event => {
    document.querySelectorAll('.qpick[open]').forEach(p => { if (!p.contains(event.target)) p.open = false; });
  });
})();
