(function () {
  var dialog = document.getElementById("dialog-nouvelle-campagne");
  var openBtn = document.getElementById("open-modal-nouvelle-campagne");
  var backdrop = dialog && dialog.querySelector(".cb-modal__backdrop");
  var btnClose = document.getElementById("cb-modal-close");
  var btnCancel = document.getElementById("cb-btn-cancel");
  var btnNext = document.getElementById("cb-btn-next");
  var step1Panel = document.getElementById("cb-wizard-step1");
  var formStepWrap = document.getElementById("cb-form-step-wrap");
  var uploadWrap = document.getElementById("cb-upload-wrap");
  var fieldset = document.getElementById("cb-fieldset-sources");
  var progressLabel = document.getElementById("cb-progress-label");
  var segments = dialog ? dialog.querySelectorAll(".cb-modal__progress .ds-progress-bar__segment") : [];

  var fileInput = document.getElementById("cb-field-fichier");
  var fileUploadRoot = document.getElementById("cb-file-upload-root");
  var uploadDocTitle = document.getElementById("cb-upload-doc-title");
  var uploadFileNameDisplay = document.getElementById("cb-upload-file-name-display");
  var uploadFileSizeDisplay = document.getElementById("cb-upload-file-size-display");
  var uploadFilePanel = document.getElementById("cb-upload-file-panel");
  var uploadBadge = document.getElementById("cb-upload-file-badge");
  var uploadSep = document.getElementById("cb-upload-action-sep");
  var uploadChevronBtn = document.getElementById("cb-upload-chevron-btn");
  var uploadChevronUp = document.getElementById("cb-upload-chevron-up");
  var uploadChevronDown = document.getElementById("cb-upload-chevron-down");
  var uploadBrowseBtn = document.getElementById("cb-upload-browse-btn");
  var uploadRemoveBtn = document.getElementById("cb-upload-remove-btn");

  var fieldNom = document.getElementById("cb-field-nom-campagne");
  var fieldTaux = document.getElementById("cb-field-taux");
  var contratCombo = document.getElementById("cb-contrat-combo");
  var contratBtn = document.getElementById("cb-field-contrat");
  var contratDisplay = document.getElementById("cb-field-contrat-display");
  var contratListbox = document.getElementById("cb-field-contrat-listbox");
  var contratOption = document.getElementById("cb-field-contrat-opt-1");
  var produitCombo = document.getElementById("cb-produit-combo");
  var produitBtn = document.getElementById("cb-field-produit");
  var produitDisplay = document.getElementById("cb-field-produit-display");
  var produitListbox = document.getElementById("cb-field-produit-listbox");
  var produitOption = document.getElementById("cb-field-produit-opt-1");

  var protoRoot = document.getElementById("proto-campagne-root");
  var manualScreen = document.getElementById("cb-screen-bailleurs-manuel");
  var backManualList = document.getElementById("cb-manual-back-list");
  var manualCampagneTitle = document.getElementById("cb-manual-campagne-title");
  var manualMetaContrat = document.getElementById("cb-manual-meta-contrat");
  var manualMetaProduit = document.getElementById("cb-manual-meta-produit");
  var manualMetaTaux = document.getElementById("cb-manual-meta-taux");
  var manualAddRow = document.getElementById("cb-manual-add-row");
  var manualTableBody = document.getElementById("cb-manual-bailleurs-tbody");
  var manualEmptyRow = document.getElementById("cb-manual-empty-row");
  var manualBailleursCount = document.getElementById("cb-manual-bailleurs-count");
  var manualBtnLancer = document.getElementById("cb-manual-btn-lancer");
  var manualSelectAll = document.getElementById("cb-manual-select-all");
  var manualActionBar = document.getElementById("cb-manual-action-bar");
  var manualActionDelete = document.getElementById("cb-manual-action-delete");
  var manualActionDeleteLabel = document.getElementById("cb-manual-action-delete-label");
  var manualActionCancel = document.getElementById("cb-manual-action-cancel");
  var dialogLancer = document.getElementById("dialog-lancer-campagne");
  var lancerBackdrop = dialogLancer && dialogLancer.querySelector(".cb-modal__backdrop");
  var lancerCloseBtn = document.getElementById("cb-lancer-modal-close");
  var lancerCancelBtn = document.getElementById("cb-lancer-modal-cancel");
  var lancerConfirmBtn = document.getElementById("cb-lancer-modal-confirm");
  var manualCampagneStatus = document.getElementById("cb-manual-campagne-status");
  var manualMainDraft = document.getElementById("cb-manual-main-draft");
  var manualMainLaunched = document.getElementById("cb-manual-main-launched");
  var manualLaunchedTbody = document.getElementById("cb-manual-launched-tbody");
  var manualLaunchedSelectAll = document.getElementById("cb-manual-launched-select-all");
  var manualLaunchedCountEl = document.getElementById("cb-manual-launched-count");
  var manualLaunchedTabAll = document.getElementById("cb-manual-launched-tab-all");
  var manualLaunchedTabSigned = document.getElementById("cb-manual-launched-tab-signed");
  var manualLaunchedTabPending = document.getElementById("cb-manual-launched-tab-pending");
  var protoCampagneListTbody = document.getElementById("proto-campagne-list-tbody");
  /** Ligne du tableau « Mes campagnes » liée à la session en cours (brouillon éditable). */
  var listRowSession = null;
  var manualFileSection = document.getElementById("cb-manual-sidebar-file-section");
  var manualSourceFileName = document.getElementById("cb-manual-source-file-name");
  var manualSourceFileSize = document.getElementById("cb-manual-source-file-size");
  var manualBtnLancerIcon = document.getElementById("cb-manual-btn-lancer-icon");
  var launchSnackbar = document.getElementById("cb-manual-launch-snackbar");
  var launchSnackbarTitle = document.getElementById("cb-manual-launch-snackbar-title");
  var launchSnackbarDismiss = document.getElementById("cb-manual-launch-snackbar-dismiss");
  var launchSnackbarLink = document.getElementById("cb-manual-launch-snackbar-link");
  var launchSnackbarTimer = null;
  /** Figma **3886:495998** (annotation 1500ms) ; délai prototype allongé pour lecture + action lien */
  var CB_MANUAL_LAUNCH_SNACKBAR_MS = 4500;
  var launchedListActionsBtn = document.getElementById("cb-launched-list-actions-btn");
  var launchedListActionsMenu = document.getElementById("cb-launched-list-actions-menu");
  var launchedDownloadAllBtn = document.getElementById("cb-launched-download-all-signed");
  var downloadSnackbar = document.getElementById("cb-manual-download-snackbar");
  var downloadSnackbarDismiss = document.getElementById("cb-manual-download-snackbar-dismiss");
  var downloadSnackbarTimer = null;
  var CB_MANUAL_DOWNLOAD_SNACKBAR_MS = 4500;
  var openLaunchedDropdownPanel = null;
  var openLaunchedDropdownTrigger = null;
  /** `manuel` | `fichier` — import fichier Figma **3819:18454** */
  var activeManualEntrySource = "manuel";
  var pendingImportFileMeta = { sourceFileName: "", sourceFileSizeLabel: "" };
  var IMPORT_FILE_BAILLEUR_SAMPLE_ROWS = 5;

  /** Données exemple import GLI · Figma **3819:18241** (lignes distinctes) */
  var GLI_SAMPLE_BAILLEURS = [
    {
      bailleur: "John Doe",
      sci: "Famille Doe",
      email: "john.doe@gmail.com",
      adresse: "37 boulevard des Capucines, 75002, Paris",
    },
    {
      bailleur: "Marie Martin",
      sci: "SCI Bellevue",
      email: "marie.martin@gmail.com",
      adresse: "12 rue de Rivoli, 75004, Paris",
    },
    {
      bailleur: "Ahmed Benali",
      sci: "SARL Invest Immo",
      email: "a.benali@mail.com",
      adresse: "89 avenue de la République, 93100, Montreuil",
    },
  ];

  /** Données exemple · Figma 3914:14654 */
  var MANUAL_SAMPLE_BAILLEUR = {
    bailleur: "John Doe",
    sci: "Famille Doe",
    email: "john.doe@gmail.com",
    adresse: "37 boulevard des Capucines, 75002, Paris",
  };

  /** Mémorisé au passage à l’étape 2 (les radios de l’étape 1 peuvent être hors scope pour querySelector). */
  var lastCreationSource = null;

  var wizardStep = 1;
  var filePanelExpanded = true;
  var lastFocus = null;
  var contratDropdownOpen = false;
  var produitDropdownOpen = false;

  function getSelectedSource() {
    var r = dialog && dialog.querySelector('input[name="cb-campagne-source"]:checked');
    return r ? r.value : null;
  }

  function setProgress(stepNum, labelText) {
    if (progressLabel) progressLabel.textContent = labelText;
    segments.forEach(function (seg, i) {
      if (i < stepNum) seg.classList.add("is-filled");
      else seg.classList.remove("is-filled");
    });
  }

  function formatFileSize(bytes) {
    if (bytes == null || typeof bytes !== "number" || isNaN(bytes)) return "—";
    if (bytes < 1024) return bytes + " o";
    if (bytes < 1048576) return Math.max(1, Math.round(bytes / 1024)) + " ko";
    return (bytes / 1048576).toFixed(1).replace(".", ",") + " Mo";
  }

  function getDefaultUploadTitle() {
    return (fileUploadRoot && fileUploadRoot.getAttribute("data-default-title")) || "Document";
  }

  function setFilePanelExpanded(expanded) {
    if (!uploadFilePanel || !uploadChevronBtn) return;
    filePanelExpanded = expanded;
    if (!fileUploadRoot || !fileUploadRoot.classList.contains("ds-file-upload--has-file")) return;
    uploadChevronBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
    if (expanded) {
      fileUploadRoot.classList.remove("ds-file-upload--panel-collapsed");
      uploadFilePanel.removeAttribute("hidden");
      if (uploadChevronUp) uploadChevronUp.removeAttribute("hidden");
      if (uploadChevronDown) uploadChevronDown.setAttribute("hidden", "");
    } else {
      fileUploadRoot.classList.add("ds-file-upload--panel-collapsed");
      uploadFilePanel.setAttribute("hidden", "");
      if (uploadChevronUp) uploadChevronUp.setAttribute("hidden", "");
      if (uploadChevronDown) uploadChevronDown.removeAttribute("hidden");
    }
  }

  function syncFileUploadUI() {
    if (!fileUploadRoot || !uploadDocTitle) return;
    var f = fileInput && fileInput.files && fileInput.files[0];
    uploadDocTitle.textContent = getDefaultUploadTitle();
    if (f) {
      fileUploadRoot.classList.add("ds-file-upload--has-file");
      if (uploadFileNameDisplay) uploadFileNameDisplay.textContent = f.name;
      if (uploadFileSizeDisplay) uploadFileSizeDisplay.textContent = formatFileSize(f.size);
      if (uploadBadge) {
        uploadBadge.removeAttribute("hidden");
        uploadBadge.removeAttribute("aria-hidden");
      }
      if (uploadSep) {
        uploadSep.removeAttribute("hidden");
        uploadSep.removeAttribute("aria-hidden");
      }
      if (uploadChevronBtn) uploadChevronBtn.removeAttribute("hidden");
      filePanelExpanded = true;
      setFilePanelExpanded(true);
      if (wizardStep >= 2) setProgress(2, "Étape 2 sur 2");
      if (wizardStep === 1) refreshSuivantEnabledStep1();
    } else {
      fileUploadRoot.classList.remove("ds-file-upload--has-file");
      fileUploadRoot.classList.remove("ds-file-upload--panel-collapsed");
      if (uploadFilePanel) uploadFilePanel.setAttribute("hidden", "");
      if (uploadFileNameDisplay) uploadFileNameDisplay.textContent = "";
      if (uploadFileSizeDisplay) uploadFileSizeDisplay.textContent = "";
      if (uploadBadge) {
        uploadBadge.setAttribute("hidden", "");
        uploadBadge.setAttribute("aria-hidden", "true");
      }
      if (uploadSep) {
        uploadSep.setAttribute("hidden", "");
        uploadSep.setAttribute("aria-hidden", "true");
      }
      if (uploadChevronBtn) uploadChevronBtn.setAttribute("hidden", "");
      if (uploadChevronUp) uploadChevronUp.setAttribute("hidden", "");
      if (uploadChevronDown) uploadChevronDown.setAttribute("hidden", "");
      if (wizardStep >= 2) setProgress(2, "Étape 2 sur 2");
      if (wizardStep === 1) refreshSuivantEnabledStep1();
    }
  }

  function refreshSuivantEnabledStep1() {
    if (!btnNext || wizardStep !== 1) return;
    var src = getSelectedSource();
    if (!src) {
      btnNext.disabled = true;
      return;
    }
    if (src === "fichier") {
      var hasFile = !!(fileInput && fileInput.files && fileInput.files[0]);
      btnNext.disabled = !hasFile;
      if (hasFile) btnNext.removeAttribute("disabled");
    } else {
      btnNext.disabled = false;
      btnNext.removeAttribute("disabled");
    }
  }

  function syncUploadVisibilityForSource() {
    if (!uploadWrap || wizardStep !== 1) return;
    if (getSelectedSource() === "fichier") uploadWrap.removeAttribute("hidden");
    else uploadWrap.setAttribute("hidden", "");
  }

  function onSourceChange() {
    var src = getSelectedSource();
    if (src !== "fichier" && fileInput) {
      fileInput.value = "";
    }
    if (wizardStep === 1) {
      syncUploadVisibilityForSource();
      syncFileUploadUI();
    }
  }

  /** Étape 2 (Figma **3819:17237**) : tous les champs requis avant « Créer la campagne » → écran liste bailleurs **3886:495628** si saisie manuelle. */
  function isFormStep2Complete() {
    var nomOk = !!(fieldNom && fieldNom.value.trim());
    var contratOk = !!(contratBtn && contratBtn.classList.contains("cb-modal__pseudo-field--has-value"));
    var produitOk = !!(produitBtn && produitBtn.classList.contains("cb-modal__pseudo-field--has-value"));
    var tauxOk = !!(fieldTaux && fieldTaux.value.trim());
    return nomOk && contratOk && produitOk && tauxOk;
  }

  function refreshCreerCampagneEnabled() {
    if (!btnNext || wizardStep !== 2) return;
    if (isFormStep2Complete()) {
      btnNext.disabled = false;
      btnNext.removeAttribute("disabled");
    } else {
      btnNext.disabled = true;
    }
  }

  function updateFooterForStep() {
    if (!btnCancel || !btnNext) return;
    if (wizardStep === 1) {
      btnCancel.textContent = "Annuler";
      btnNext.textContent = "Suivant";
      refreshSuivantEnabledStep1();
    } else {
      btnCancel.textContent = "Retour";
      btnNext.textContent = "Créer la campagne";
      refreshCreerCampagneEnabled();
    }
  }

  function syncManualScreenFromForm() {
    if (manualCampagneTitle && fieldNom) {
      var name = (fieldNom.value || "").trim();
      manualCampagneTitle.textContent = name || "Campagne n°20";
    }
    if (manualMetaContrat && contratDisplay) {
      manualMetaContrat.textContent = contratDisplay.textContent.trim() || "—";
    }
    if (manualMetaProduit && produitDisplay) {
      manualMetaProduit.textContent = produitDisplay.textContent.trim() || "—";
    }
    if (manualMetaTaux && fieldTaux) {
      var t = (fieldTaux.value || "").trim().replace(".", ",");
      if (!t) manualMetaTaux.textContent = "3,1\u00a0%";
      else manualMetaTaux.textContent = t.indexOf("%") >= 0 ? t : t + "\u00a0%";
    }
  }

  function showManualBailleursScreen() {
    if (protoRoot) protoRoot.setAttribute("hidden", "");
    if (manualScreen) manualScreen.removeAttribute("hidden");
  }

  function hideManualBailleursScreen() {
    if (dialogLancer && !dialogLancer.hasAttribute("hidden")) {
      dialogLancer.setAttribute("hidden", "");
    }
    if (manualScreen) manualScreen.setAttribute("hidden", "");
    if (protoRoot) protoRoot.removeAttribute("hidden");
  }

  /** Affiche l’écran principal brouillon ou post-lancement (onglets + tableau étendu). */
  function setManualLaunchedUI(isLaunched) {
    var root = document.getElementById("cb-screen-bailleurs-manuel");
    if (!root) return;
    if (isLaunched) {
      if (manualCampagneStatus) {
        manualCampagneStatus.textContent = "Lancée";
        manualCampagneStatus.classList.remove("ds-table__tag-dropdown--grey");
      }
      if (manualMainDraft) manualMainDraft.setAttribute("hidden", "");
      if (manualMainLaunched) manualMainLaunched.removeAttribute("hidden");
      root.classList.add("cb-manual-screen--launched");
      updateManualActionBar();
    } else {
      if (manualCampagneStatus) {
        manualCampagneStatus.textContent = "Brouillon";
        manualCampagneStatus.classList.add("ds-table__tag-dropdown--grey");
      }
      if (manualMainDraft) manualMainDraft.removeAttribute("hidden");
      if (manualMainLaunched) manualMainLaunched.setAttribute("hidden", "");
      root.classList.remove("cb-manual-screen--launched");
      updateManualActionBar();
    }
  }

  /** Réinitialise l’écran bailleurs (nouvelle campagne) sans retirer les lignes déjà listées. */
  function resetManualSessionState() {
    listRowSession = null;
    activeManualEntrySource = "manuel";
    pendingImportFileMeta.sourceFileName = "";
    pendingImportFileMeta.sourceFileSizeLabel = "";
    applyManualSidebarFileSource(false, null);
    setGliTableChrome(false);
    var root = document.getElementById("cb-screen-bailleurs-manuel");
    if (!root) return;
    root.classList.remove("cb-manual-screen--launched");
    if (manualMainDraft) manualMainDraft.removeAttribute("hidden");
    if (manualMainLaunched) manualMainLaunched.setAttribute("hidden", "");
    if (manualCampagneStatus) {
      manualCampagneStatus.textContent = "Brouillon";
      manualCampagneStatus.classList.add("ds-table__tag-dropdown--grey");
    }
    if (manualTableBody) {
      manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row").forEach(function (r) {
        r.remove();
      });
    }
    if (manualLaunchedTbody) manualLaunchedTbody.innerHTML = "";
    hideLaunchSnackbarImmediate();
    clearManualBailleurSelection();
    syncManualBailleursTableUI();
  }

  function readFormMetaForListSnapshot() {
    /** Ne pas appeler syncManualScreenFromForm() ici : après closeModal(), les combos sont
     *  réinitialisés — on lirait les placeholders et on écraserait la sidebar. Les libellés
     *  viennent de la sidebar, déjà remplis dans onNext avant closeModal(). */
    var nom =
      (manualCampagneTitle && manualCampagneTitle.textContent.trim()) ||
      (fieldNom && fieldNom.value.trim()) ||
      "Campagne";
    var metaC = manualMetaContrat ? manualMetaContrat.textContent.trim() : "—";
    var metaP = manualMetaProduit ? manualMetaProduit.textContent.trim() : "—";
    var metaT = manualMetaTaux ? manualMetaTaux.textContent.trim() : "—";
    var tauxListe = metaT.replace(/\u00a0/g, " ").trim();
    if (!tauxListe || tauxListe === "—") tauxListe = "—";
    else if (tauxListe.indexOf("%") < 0) tauxListe = tauxListe + "%";
    return {
      status: "draft",
      nomCampagne: nom,
      metaContrat: metaC,
      metaProduit: metaP,
      metaTaux: metaT,
      dateLancement: "-",
      typeCampagne: "Campagne BIA",
      contratListe: metaC,
      produitListe: metaP,
      tauxListe: tauxListe,
      bailleurs: [],
      nDest: 0,
      sourceType: activeManualEntrySource || "manuel",
      sourceFileName: pendingImportFileMeta.sourceFileName || "",
      sourceFileSizeLabel: pendingImportFileMeta.sourceFileSizeLabel || "",
    };
  }

  function truncateFileNameForManual(name, maxLen) {
    maxLen = maxLen || 42;
    if (!name || name.length <= maxLen) return name;
    return name.slice(0, maxLen - 1) + "\u2026";
  }

  function capturePendingImportFileMeta() {
    var f = fileInput && fileInput.files && fileInput.files[0];
    pendingImportFileMeta.sourceFileName =
      f && f.name ? f.name : "liste-bailleur-contrat-cadre-n°1234.pdf";
    pendingImportFileMeta.sourceFileSizeLabel = f ? formatFileSize(f.size) : "64 ko";
  }

  function applyManualSidebarFileSource(isFichier, meta) {
    if (!manualScreen) return;
    if (isFichier && meta) {
      manualScreen.classList.remove("cb-manual-screen--source-gli");
      manualScreen.classList.add("cb-manual-screen--source-file");
      if (manualFileSection) manualFileSection.removeAttribute("hidden");
      if (manualSourceFileName) {
        manualSourceFileName.textContent = truncateFileNameForManual(meta.sourceFileName || "");
      }
      if (manualSourceFileSize) manualSourceFileSize.textContent = meta.sourceFileSizeLabel || "";
      if (manualBtnLancerIcon) manualBtnLancerIcon.removeAttribute("hidden");
    } else {
      manualScreen.classList.remove("cb-manual-screen--source-file");
      if (manualFileSection) manualFileSection.setAttribute("hidden", "");
      if (manualBtnLancerIcon) manualBtnLancerIcon.setAttribute("hidden", "");
    }
  }

  function setGliTableChrome(on) {
    if (!manualScreen) return;
    var th = document.getElementById("cb-manual-th-gli-status");
    var sw = document.getElementById("cb-manual-gli-statuts-wrap");
    var emptyTd = document.querySelector("#cb-manual-empty-row .cb-manual-table-card__empty-cell");
    if (on) {
      manualScreen.classList.add("cb-manual-screen--source-gli");
      if (th) th.removeAttribute("hidden");
      if (sw) sw.removeAttribute("hidden");
      if (emptyTd) emptyTd.setAttribute("colspan", "6");
      if (manualBtnLancerIcon) manualBtnLancerIcon.removeAttribute("hidden");
    } else {
      manualScreen.classList.remove("cb-manual-screen--source-gli");
      if (th) th.setAttribute("hidden", "");
      if (sw) sw.setAttribute("hidden", "");
      if (emptyTd) emptyTd.setAttribute("colspan", "5");
    }
  }

  function setupGliBailleursScreen() {
    if (!manualTableBody || !manualEmptyRow) return;
    if (manualScreen) manualScreen.classList.remove("cb-manual-screen--source-file");
    applyManualSidebarFileSource(false, null);
    setGliTableChrome(true);
    manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row").forEach(function (r) {
      r.remove();
    });
    var i;
    for (i = 0; i < GLI_SAMPLE_BAILLEURS.length; i++) {
      var gliTr = createManualBailleurRow(GLI_SAMPLE_BAILLEURS[i], true);
      manualTableBody.insertBefore(gliTr, manualEmptyRow);
      bindManualBailleurRowSelection(gliTr);
    }
    clearManualBailleurSelection();
    syncManualBailleursTableUI();
  }

  function setupFileImportBailleursScreen() {
    if (!manualTableBody || !manualEmptyRow) return;
    setGliTableChrome(false);
    applyManualSidebarFileSource(true, pendingImportFileMeta);
    if (manualScreen) manualScreen.classList.remove("cb-manual-screen--source-gli");
    manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row").forEach(function (r) {
      r.remove();
    });
    var i;
    for (i = 0; i < IMPORT_FILE_BAILLEUR_SAMPLE_ROWS; i++) {
      var fileTr = createManualBailleurRow(MANUAL_SAMPLE_BAILLEUR);
      manualTableBody.insertBefore(fileTr, manualEmptyRow);
      bindManualBailleurRowSelection(fileTr);
    }
    clearManualBailleurSelection();
    syncManualBailleursTableUI();
  }

  function syncSnapshotBailleursFromManualTable(s) {
    if (!s || !manualTableBody) return;
    s.bailleurs = [];
    manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row").forEach(function (row) {
      s.bailleurs.push({
        bailleur: getBailleurDraftCellText(row, 1),
        sci: getBailleurDraftCellText(row, 2),
        email: getBailleurDraftCellText(row, 3),
        adresse: getBailleurDraftCellText(row, 4),
      });
    });
    s.nDest = s.bailleurs.length;
  }

  function renderProtoCampagneListRow(tr) {
    var s = tr._cbSnapshot;
    if (!s) return;
    var n = typeof s.nDest === "number" ? s.nDest : (s.bailleurs && s.bailleurs.length) || 0;
    var statutHtml =
      s.status === "launched"
        ? '<span class="ds-table__tag-dropdown">Lancée</span>'
        : '<span class="ds-table__tag-dropdown ds-table__tag-dropdown--grey">Brouillon</span>';
    var nomSafe = escapeHtmlManual(s.nomCampagne || "—");
    var dateL = escapeHtmlManual(s.dateLancement || "—");
    var typeC = escapeHtmlManual(s.typeCampagne || "Campagne BIA");
    var contrat = escapeHtmlManual(s.contratListe || "—");
    var produit = escapeHtmlManual(s.produitListe || "—");
    var taux = escapeHtmlManual(s.tauxListe || "—");
    var destLabel = n + " destinataire" + (n !== 1 ? "s" : "");
    tr.innerHTML =
      '<td class="ds-table__td ds-table__td--checkbox">' +
      '<input type="checkbox" class="ds-table__checkbox" aria-label="Sélectionner la ligne" /></td>' +
      '<td class="ds-table__td ds-table__td--strong">' +
      '<button type="button" class="proto-campagne__table-link proto-campagne__row-open">' +
      nomSafe +
      "</button></td>" +
      '<td class="ds-table__td ds-table__td--strong">' +
      dateL +
      "</td>" +
      '<td class="ds-table__td">' +
      typeC +
      "</td>" +
      '<td class="ds-table__td">' +
      contrat +
      "</td>" +
      '<td class="ds-table__td">' +
      produit +
      "</td>" +
      '<td class="ds-table__td">' +
      taux +
      "</td>" +
      '<td class="ds-table__td"><span class="proto-campagne__inline-cell"><span>' +
      escapeHtmlManual(destLabel) +
      '</span><button type="button" class="ds-table__btn-icon" aria-label="Voir le détail des destinataires">' +
      '<img src="src/assets/icons/eye-16.svg" width="16" height="16" alt="" aria-hidden="true" /></button></span></td>' +
      '<td class="ds-table__td">' +
      statutHtml +
      "</td>" +
      '<td class="ds-table__td"><button type="button" class="ds-table__btn-icon" aria-label="Actions sur la ligne">' +
      '<img src="src/assets/icons/more-vertical-16-text-neutral-standard.svg" width="16" height="16" alt="" aria-hidden="true" /></button></td>';
    tr.className = "proto-campagne__row proto-campagne__row--clickable";
    tr.setAttribute("tabindex", "0");
    tr._cbSnapshot = s;
  }

  function ensureProtoListDraftRowOnCreate() {
    if (!protoCampagneListTbody) return;
    var tr = document.createElement("tr");
    tr._cbSnapshot = readFormMetaForListSnapshot();
    syncSnapshotBailleursFromManualTable(tr._cbSnapshot);
    renderProtoCampagneListRow(tr);
    protoCampagneListTbody.insertBefore(tr, protoCampagneListTbody.firstChild);
    listRowSession = tr;
  }

  function syncListRowSessionFromManual() {
    if (!listRowSession || !listRowSession._cbSnapshot || listRowSession._cbSnapshot.status !== "draft") return;
    syncSnapshotBailleursFromManualTable(listRowSession._cbSnapshot);
    if (manualCampagneTitle) {
      listRowSession._cbSnapshot.nomCampagne = manualCampagneTitle.textContent.trim() || listRowSession._cbSnapshot.nomCampagne;
    }
    if (manualMetaContrat) listRowSession._cbSnapshot.metaContrat = manualMetaContrat.textContent.trim();
    if (manualMetaProduit) listRowSession._cbSnapshot.metaProduit = manualMetaProduit.textContent.trim();
    if (manualMetaTaux) listRowSession._cbSnapshot.metaTaux = manualMetaTaux.textContent.trim();
    listRowSession._cbSnapshot.contratListe = listRowSession._cbSnapshot.metaContrat;
    listRowSession._cbSnapshot.produitListe = listRowSession._cbSnapshot.metaProduit;
    var tRaw = (listRowSession._cbSnapshot.metaTaux || "").replace(/\u00a0/g, " ").trim();
    listRowSession._cbSnapshot.tauxListe =
      !tRaw || tRaw === "—" ? "—" : tRaw.indexOf("%") >= 0 ? tRaw : tRaw + "%";
    renderProtoCampagneListRow(listRowSession);
  }

  function openCampagneDetailFromList(tr) {
    if (!tr._cbSnapshot || !manualTableBody || !manualEmptyRow) return;
    var s = tr._cbSnapshot;
    if (manualCampagneTitle) manualCampagneTitle.textContent = s.nomCampagne || "—";
    if (manualMetaContrat) manualMetaContrat.textContent = s.metaContrat || "—";
    if (manualMetaProduit) manualMetaProduit.textContent = s.metaProduit || "—";
    if (manualMetaTaux) manualMetaTaux.textContent = s.metaTaux || "—";

    if (s.sourceType === "fichier") {
      applyManualSidebarFileSource(true, {
        sourceFileName: s.sourceFileName,
        sourceFileSizeLabel: s.sourceFileSizeLabel,
      });
      activeManualEntrySource = "fichier";
      setGliTableChrome(false);
    } else if (s.sourceType === "gli") {
      applyManualSidebarFileSource(false, null);
      activeManualEntrySource = "gli";
      setGliTableChrome(true);
    } else {
      applyManualSidebarFileSource(false, null);
      activeManualEntrySource = "manuel";
      setGliTableChrome(false);
    }

    manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row").forEach(function (r) {
      r.remove();
    });
    var bailleurs = s.bailleurs || [];
    var i;
    for (i = 0; i < bailleurs.length; i++) {
      var draftTr = createManualBailleurRow(bailleurs[i], s.sourceType === "gli");
      manualTableBody.insertBefore(draftTr, manualEmptyRow);
      bindManualBailleurRowSelection(draftTr);
    }
    syncManualBailleursTableUI();

    if (s.status === "launched") {
      syncLaunchedTableFromDraft();
      setManualLaunchedUI(true);
      listRowSession = null;
    } else {
      setManualLaunchedUI(false);
      listRowSession = tr;
    }
    showManualBailleursScreen();
  }

  function attachProtoCampagneListInteractions() {
    if (!protoCampagneListTbody) return;
    protoCampagneListTbody.addEventListener("click", function (e) {
      var tr = e.target && e.target.closest && e.target.closest("tr.proto-campagne__row--clickable");
      if (!tr || !tr._cbSnapshot) return;
      if (e.target.closest(".ds-table__td--checkbox")) return;
      if (e.target.closest(".ds-table__btn-icon")) return;
      openCampagneDetailFromList(tr);
    });
    protoCampagneListTbody.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var tr = e.target && e.target.closest && e.target.closest("tr.proto-campagne__row--clickable");
      if (!tr || document.activeElement !== tr) return;
      e.preventDefault();
      openCampagneDetailFromList(tr);
    });
  }

  function resetUploadState() {
    if (uploadWrap) uploadWrap.setAttribute("hidden", "");
    if (fileInput) fileInput.value = "";
    syncFileUploadUI();
  }

  function closeContratDropdown() {
    contratDropdownOpen = false;
    if (contratListbox) contratListbox.setAttribute("hidden", "");
    if (contratBtn) contratBtn.setAttribute("aria-expanded", "false");
  }

  function openContratDropdown() {
    if (!contratListbox || !contratBtn) return;
    closeProduitDropdown();
    contratListbox.removeAttribute("hidden");
    contratBtn.setAttribute("aria-expanded", "true");
    contratDropdownOpen = true;
  }

  function resetContratField() {
    closeContratDropdown();
    if (contratDisplay) {
      var ph = contratDisplay.getAttribute("data-placeholder") || "Sélectionner un contrat cadre";
      contratDisplay.textContent = ph;
    }
    if (contratBtn) contratBtn.classList.remove("cb-modal__pseudo-field--has-value");
  }

  function closeProduitDropdown() {
    produitDropdownOpen = false;
    if (produitListbox) produitListbox.setAttribute("hidden", "");
    if (produitBtn) produitBtn.setAttribute("aria-expanded", "false");
  }

  function openProduitDropdown() {
    if (!produitListbox || !produitBtn) return;
    closeContratDropdown();
    produitListbox.removeAttribute("hidden");
    produitBtn.setAttribute("aria-expanded", "true");
    produitDropdownOpen = true;
  }

  function resetProduitField() {
    closeProduitDropdown();
    if (produitDisplay) {
      var ph2 = produitDisplay.getAttribute("data-placeholder") || "Sélectionner un produit";
      produitDisplay.textContent = ph2;
    }
    if (produitBtn) produitBtn.classList.remove("cb-modal__pseudo-field--has-value");
  }

  function resetFormFields() {
    if (fieldNom) fieldNom.value = "";
    if (fieldTaux) fieldTaux.value = "";
    resetContratField();
    resetProduitField();
  }

  function goToStep(step) {
    wizardStep = step;
    if (step === 1) {
      if (step1Panel) step1Panel.removeAttribute("hidden");
      if (formStepWrap) formStepWrap.setAttribute("hidden", "");
      if (fieldset) fieldset.removeAttribute("disabled");
      syncUploadVisibilityForSource();
      setProgress(1, "Étape 1 sur 2");
    } else {
      if (step1Panel) step1Panel.setAttribute("hidden", "");
      if (formStepWrap) formStepWrap.removeAttribute("hidden");
      setProgress(2, "Étape 2 sur 2");
    }
    updateFooterForStep();
  }

  function openModal() {
    if (!dialog) return;
    lastFocus = document.activeElement;
    lastCreationSource = null;
    hideManualBailleursScreen();
    resetManualSessionState();
    dialog.removeAttribute("hidden");
    var radios = dialog.querySelectorAll('input[name="cb-campagne-source"]');
    radios.forEach(function (r) {
      r.checked = false;
    });
    resetFormFields();
    resetUploadState();
    goToStep(1);
    if (btnClose) btnClose.focus();
  }

  function closeModal() {
    if (!dialog) return;
    dialog.setAttribute("hidden", "");
    resetFormFields();
    resetUploadState();
    goToStep(1);
    var radios = dialog.querySelectorAll('input[name="cb-campagne-source"]');
    radios.forEach(function (r) {
      r.checked = false;
    });
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    lastCreationSource = null;
  }

  function onNext() {
    var src = getSelectedSource();
    if (wizardStep === 1) {
      if (!src) return;
      if (src === "fichier") {
        var hasFile = !!(fileInput && fileInput.files && fileInput.files[0]);
        if (!hasFile) return;
      }
      lastCreationSource = src;
      goToStep(2);
      return;
    }
    if (wizardStep === 2) {
      var mode = lastCreationSource || getSelectedSource();
      if (!isFormStep2Complete()) return;
      syncManualScreenFromForm();
      if (mode === "fichier") {
        capturePendingImportFileMeta();
      }
      closeModal();
      if (mode === "manuel") {
        activeManualEntrySource = "manuel";
        setGliTableChrome(false);
        showManualBailleursScreen();
        ensureProtoListDraftRowOnCreate();
      } else if (mode === "fichier") {
        activeManualEntrySource = "fichier";
        showManualBailleursScreen();
        setupFileImportBailleursScreen();
        ensureProtoListDraftRowOnCreate();
      } else if (mode === "gli") {
        activeManualEntrySource = "gli";
        showManualBailleursScreen();
        setupGliBailleursScreen();
        ensureProtoListDraftRowOnCreate();
      }
      return;
    }
  }

  function onCancel() {
    if (wizardStep === 2) goToStep(1);
    else closeModal();
  }

  function escapeHtmlManual(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isGliDraftTable() {
    return (
      activeManualEntrySource === "gli" ||
      !!(manualScreen && manualScreen.classList.contains("cb-manual-screen--source-gli"))
    );
  }

  function syncManualRowSelection(tr) {
    var cb = tr.querySelector(".ds-table__checkbox");
    if (!cb) return;
    tr.classList.toggle("is-selected", cb.checked);
    cb.setAttribute("aria-checked", cb.checked ? "true" : "false");
  }

  function updateManualSelectAllState() {
    if (!manualSelectAll || !manualTableBody) return;
    var rowCbs = manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row .ds-table__checkbox");
    if (!rowCbs.length) {
      manualSelectAll.checked = false;
      manualSelectAll.indeterminate = false;
      return;
    }
    var checked = manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row .ds-table__checkbox:checked");
    manualSelectAll.checked = checked.length === rowCbs.length;
    manualSelectAll.indeterminate = checked.length > 0 && checked.length < rowCbs.length;
  }

  function updateManualActionBar() {
    if (!manualActionBar || !manualTableBody) return;
    var root = document.getElementById("cb-screen-bailleurs-manuel");
    var isLaunched = root && root.classList.contains("cb-manual-screen--launched");
    var checked = manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row .ds-table__checkbox:checked");
    var n = checked.length;
    var visible = !isLaunched && n > 0;
    manualActionBar.hidden = !visible;
    if (root) {
      root.classList.toggle("cb-manual-screen--has-action-bar", visible);
    }
    if (manualActionDeleteLabel && manualActionDelete) {
      var label = n <= 1 ? "Supprimer le bailleur" : "Supprimer les bailleurs";
      manualActionDeleteLabel.textContent = label;
      manualActionDelete.setAttribute("aria-label", label);
    }
  }

  function refreshManualBailleurSelectionUI() {
    if (!manualTableBody) return;
    manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row").forEach(syncManualRowSelection);
    updateManualSelectAllState();
    updateManualActionBar();
  }

  function clearManualBailleurSelection() {
    if (!manualTableBody) return;
    manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row .ds-table__checkbox").forEach(function (cb) {
      cb.checked = false;
    });
    if (manualSelectAll) {
      manualSelectAll.checked = false;
      manualSelectAll.indeterminate = false;
    }
    refreshManualBailleurSelectionUI();
  }

  function bindManualBailleurRowSelection(tr) {
    var cb = tr.querySelector(".ds-table__checkbox");
    if (!cb || cb.dataset.cbSelectionBound === "1") return;
    cb.dataset.cbSelectionBound = "1";
    cb.addEventListener("change", function () {
      syncManualRowSelection(tr);
      updateManualSelectAllState();
      updateManualActionBar();
    });
    syncManualRowSelection(tr);
  }

  function deleteSelectedManualBailleurRows() {
    if (!manualTableBody) return;
    var toRemove = [];
    manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row .ds-table__checkbox:checked").forEach(function (cb) {
      var tr = cb.closest("tr");
      if (tr) toRemove.push(tr);
    });
    toRemove.forEach(function (tr) {
      tr.remove();
    });
    if (manualSelectAll) {
      manualSelectAll.checked = false;
      manualSelectAll.indeterminate = false;
    }
    syncManualBailleursTableUI();
    refreshManualBailleurSelectionUI();
  }

  function createManualBailleurRow(data, withGliStatus) {
    var tr = document.createElement("tr");
    tr.className = "cb-manual-bailleur-row";
    var gliCell =
      withGliStatus === true
        ? '<td class="ds-table__td cb-manual-td--gli-status"><span class="cb-manual-row-status cb-manual-row-status--nouveau">Nouveau</span></td>'
        : "";
    tr.innerHTML =
      '<td class="ds-table__td ds-table__td--checkbox">' +
      '<input type="checkbox" class="ds-table__checkbox" aria-label="Sélectionner cette ligne" />' +
      "</td>" +
      '<td class="ds-table__td"><span class="cb-manual-bailleur-row__text cb-manual-bailleur-row__text--editable" contenteditable="true" spellcheck="false" role="textbox" tabindex="0">' +
      escapeHtmlManual(data.bailleur) +
      "</span></td>" +
      '<td class="ds-table__td"><span class="cb-manual-bailleur-row__text cb-manual-bailleur-row__text--editable" contenteditable="true" spellcheck="false" role="textbox" tabindex="0">' +
      escapeHtmlManual(data.sci) +
      "</span></td>" +
      '<td class="ds-table__td"><span class="cb-manual-bailleur-row__text cb-manual-bailleur-row__text--editable" contenteditable="true" spellcheck="false" role="textbox" tabindex="0">' +
      escapeHtmlManual(data.email) +
      "</span></td>" +
      '<td class="ds-table__td"><span class="cb-manual-bailleur-row__text cb-manual-bailleur-row__text--editable" contenteditable="true" spellcheck="false" role="textbox" tabindex="0">' +
      escapeHtmlManual(data.adresse) +
      "</span></td>" +
      gliCell;
    return tr;
  }

  function getManualBailleurRowCount() {
    if (!manualTableBody) return 0;
    return manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row").length;
  }

  function syncManualBailleursTableUI() {
    var n = getManualBailleurRowCount();
    if (manualBailleursCount) {
      manualBailleursCount.textContent = "Nombre total de bailleurs : " + n;
    }
    if (manualEmptyRow) {
      manualEmptyRow.hidden = n > 0;
    }
    if (manualSelectAll) {
      manualSelectAll.disabled = n === 0;
      if (n === 0) manualSelectAll.checked = false;
    }
    if (manualBtnLancer) {
      manualBtnLancer.disabled = n === 0;
    }
    updateManualSelectAllState();
    updateManualActionBar();
    syncListRowSessionFromManual();
  }

  function addManualBailleurRow() {
    if (!manualTableBody || !manualEmptyRow) return;
    var index = getManualBailleurRowCount() + 1;
    var data =
      index === 1
        ? MANUAL_SAMPLE_BAILLEUR
        : {
            bailleur: "John Doe (" + index + ")",
            sci: "Famille Doe",
            email: "john.doe+" + index + "@gmail.com",
            adresse: "37 boulevard des Capucines, 75002, Paris",
          };
    var tr = createManualBailleurRow(data, isGliDraftTable());
    manualTableBody.insertBefore(tr, manualEmptyRow);
    bindManualBailleurRowSelection(tr);
    syncManualBailleursTableUI();
  }

  function populateLancerCampagneSummary() {
    var summaryEl = document.getElementById("cb-lancer-modal-summary");
    if (!summaryEl) return;
    var contratEl = document.getElementById("cb-manual-meta-contrat");
    var produitEl = document.getElementById("cb-manual-meta-produit");
    var tauxEl = document.getElementById("cb-manual-meta-taux");
    var contratRaw = contratEl ? contratEl.textContent.trim() : "—";
    var contratVal = contratRaw.replace(/^Contrat cadre\s*/i, "").trim() || contratRaw;
    var produit = produitEl ? produitEl.textContent.trim() : "—";
    var tauxRaw = tauxEl ? tauxEl.textContent.trim() : "—";
    var tauxCompact = tauxRaw.replace(/\u00a0/g, " ").trim().replace(/\s*%/, "%");
    var n = getManualBailleurRowCount();
    var html =
      '<p class="cb-lancer-modal__summary-line">- Contrat cadre : <strong>' +
      escapeHtmlManual(contratVal) +
      "</strong></p>" +
      '<p class="cb-lancer-modal__summary-line">- Produit : <strong>' +
      escapeHtmlManual(produit) +
      "</strong></p>" +
      '<p class="cb-lancer-modal__summary-line">- Taux : <strong>' +
      escapeHtmlManual(tauxCompact) +
      "</strong></p>" +
      '<p class="cb-lancer-modal__summary-line">- Nombre de bailleurs concernés : <strong>' +
      escapeHtmlManual(String(n)) +
      "</strong></p>";
    if (manualScreen && manualScreen.classList.contains("cb-manual-screen--source-file")) {
      var fn = manualSourceFileName && manualSourceFileName.textContent.trim();
      if (fn) {
        html +=
          '<p class="cb-lancer-modal__summary-line">- Fichier importé : <strong>' +
          escapeHtmlManual(fn) +
          "</strong></p>";
      }
    }
    summaryEl.innerHTML = html;
  }

  function openLancerCampagneModal() {
    if (!dialogLancer) return;
    populateLancerCampagneSummary();
    dialogLancer.removeAttribute("hidden");
    if (lancerCloseBtn) lancerCloseBtn.focus();
  }

  function closeLancerCampagneModal() {
    if (!dialogLancer) return;
    dialogLancer.setAttribute("hidden", "");
  }

  /** Indices des lignes « Signé » · aligné Figma **3819:18548** (ex. n=5 → lignes 3 et 5) */
  function computeSignedRowIndicesSet(n) {
    var s = {};
    if (n <= 0) return s;
    if (n === 5) {
      s[2] = true;
      s[4] = true;
      return s;
    }
    if (n >= 4) {
      s[n - 2] = true;
      s[n - 1] = true;
      return s;
    }
    if (n === 3) {
      s[2] = true;
      return s;
    }
    if (n === 2) {
      s[1] = true;
      return s;
    }
    return s;
  }

  function getBailleurDraftCellText(tr, tdIndex) {
    var tds = tr.querySelectorAll("td");
    return tds[tdIndex] ? tds[tdIndex].textContent.trim() : "";
  }

  function editableBailleurCellFromEventTarget(el) {
    return el && el.closest && el.closest(".cb-manual-bailleur-row__text--editable");
  }

  function normalizeEditableBailleurCell(cell) {
    if (!cell) return;
    cell.textContent = String(cell.textContent || "")
      .replace(/\r?\n/g, " ")
      .replace(/\u00a0/g, " ")
      .trim();
  }

  function syncDraftFromLaunchedRow(launchedTr) {
    if (!manualLaunchedTbody || !manualTableBody || !launchedTr) return;
    var idx = Array.prototype.indexOf.call(manualLaunchedTbody.rows, launchedTr);
    if (idx < 0) return;
    var draftRows = manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row");
    var draftTr = draftRows[idx];
    if (!draftTr) return;
    var launchedSpans = launchedTr.querySelectorAll(".cb-manual-bailleur-row__text--editable");
    var draftSpans = draftTr.querySelectorAll(".cb-manual-bailleur-row__text--editable");
    var i;
    for (i = 0; i < 4; i++) {
      if (launchedSpans[i] && draftSpans[i]) draftSpans[i].textContent = launchedSpans[i].textContent.trim();
    }
  }

  function onManualBailleurEditableKeydown(e) {
    if (e.key !== "Enter") return;
    var cell = editableBailleurCellFromEventTarget(e.target);
    if (!cell) return;
    e.preventDefault();
    cell.blur();
  }

  function onManualEditablePaste(e) {
    var cell = editableBailleurCellFromEventTarget(e.target);
    if (!cell) return;
    e.preventDefault();
    var text = (e.clipboardData || window.clipboardData).getData("text/plain") || "";
    text = text.replace(/\r?\n/g, " ");
    if (document.queryCommandSupported && document.queryCommandSupported("insertText")) {
      document.execCommand("insertText", false, text);
    } else {
      cell.textContent = (cell.textContent || "") + text;
    }
  }

  function onManualBailleurCellFocusout(e) {
    var cell = e.target;
    if (!cell.classList || !cell.classList.contains("cb-manual-bailleur-row__text--editable")) return;
    normalizeEditableBailleurCell(cell);
    var tr = cell.closest("tr");
    if (manualLaunchedTbody && tr && manualLaunchedTbody.contains(tr)) {
      syncDraftFromLaunchedRow(tr);
    }
    syncListRowSessionFromManual();
  }

  function wireManualBailleurEditableTables() {
    [manualTableBody, manualLaunchedTbody].forEach(function (tb) {
      if (!tb || tb._cbManualEditWired) return;
      tb._cbManualEditWired = true;
      tb.addEventListener("keydown", onManualBailleurEditableKeydown, true);
      tb.addEventListener("paste", onManualEditablePaste, true);
      tb.addEventListener("focusout", onManualBailleurCellFocusout);
    });
  }

  function closeLaunchedDropdowns() {
    if (openLaunchedDropdownPanel) {
      openLaunchedDropdownPanel.setAttribute("hidden", "");
      openLaunchedDropdownPanel = null;
    }
    if (openLaunchedDropdownTrigger) {
      openLaunchedDropdownTrigger.setAttribute("aria-expanded", "false");
      openLaunchedDropdownTrigger = null;
    }
  }

  function toggleLaunchedDropdown(trigger, panel) {
    if (!trigger || !panel) return;
    var isOpen = openLaunchedDropdownPanel === panel;
    closeLaunchedDropdowns();
    if (isOpen) return;
    panel.removeAttribute("hidden");
    trigger.setAttribute("aria-expanded", "true");
    openLaunchedDropdownPanel = panel;
    openLaunchedDropdownTrigger = trigger;
  }

  function getLaunchedSignedRowCount() {
    if (!manualLaunchedTbody) return 0;
    return manualLaunchedTbody.querySelectorAll('tr[data-cb-signed="true"]').length;
  }

  function updateLaunchedListDownloadMenuState() {
    if (!launchedDownloadAllBtn) return;
    var count = getLaunchedSignedRowCount();
    var disabled = count === 0;
    launchedDownloadAllBtn.disabled = disabled;
    launchedDownloadAllBtn.setAttribute("aria-disabled", disabled ? "true" : "false");
  }

  function hideDownloadSnackbarImmediate() {
    if (downloadSnackbarTimer) {
      clearTimeout(downloadSnackbarTimer);
      downloadSnackbarTimer = null;
    }
    if (!downloadSnackbar) return;
    downloadSnackbar.classList.remove("is-open");
    downloadSnackbar.setAttribute("hidden", "");
    downloadSnackbar.setAttribute("aria-hidden", "true");
  }

  function showDownloadBiaSnackbar() {
    if (!downloadSnackbar) return;
    if (downloadSnackbarTimer) {
      clearTimeout(downloadSnackbarTimer);
      downloadSnackbarTimer = null;
    }
    downloadSnackbar.removeAttribute("hidden");
    downloadSnackbar.setAttribute("aria-hidden", "false");
    downloadSnackbar.classList.remove("is-open");
    void downloadSnackbar.offsetWidth;
    downloadSnackbar.classList.add("is-open");
    downloadSnackbarTimer = setTimeout(function () {
      downloadSnackbarTimer = null;
      if (downloadSnackbar) downloadSnackbar.classList.remove("is-open");
    }, CB_MANUAL_DOWNLOAD_SNACKBAR_MS);
  }

  function buildLaunchedRowActionsCell(signed) {
    if (!signed) {
      return '<td class="ds-table__td ds-table__td--row-actions" aria-hidden="true"></td>';
    }
    return (
      '<td class="ds-table__td ds-table__td--row-actions">' +
      '<div class="cb-launched-row-menu" data-cb-signed="true">' +
      '<button type="button" class="ds-table__btn-icon cb-launched-row-menu__trigger" aria-label="Actions pour cette ligne" aria-haspopup="menu" aria-expanded="false">' +
      '<img src="src/assets/icons/more-vertical-16-text-neutral-standard.svg" width="16" height="16" alt="" aria-hidden="true" /></button>' +
      '<div class="ds-dropdown-content cb-launched-row-menu__panel" role="menu" aria-label="Actions pour cette ligne" hidden>' +
      '<ul class="ds-dropdown-content__list"><li role="none">' +
      '<button type="button" class="ds-dropdown-content__item cb-launched-row-download-bia" role="menuitem">' +
      '<img src="src/assets/icons/download-16.svg" width="16" height="16" alt="" aria-hidden="true" />' +
      "Télécharger le BIA" +
      "</button></li></ul></div></div></td>"
    );
  }

  function wireLaunchedRowMenus() {
    if (!manualLaunchedTbody) return;
    manualLaunchedTbody.querySelectorAll(".cb-launched-row-menu").forEach(function (wrap) {
      var trigger = wrap.querySelector(".cb-launched-row-menu__trigger");
      var panel = wrap.querySelector(".cb-launched-row-menu__panel");
      var downloadBtn = wrap.querySelector(".cb-launched-row-download-bia");
      if (trigger && panel && trigger.dataset.cbMenuWired !== "1") {
        trigger.dataset.cbMenuWired = "1";
        trigger.addEventListener("click", function (e) {
          e.stopPropagation();
          toggleLaunchedDropdown(trigger, panel);
        });
      }
      if (downloadBtn && downloadBtn.dataset.cbDownloadWired !== "1") {
        downloadBtn.dataset.cbDownloadWired = "1";
        downloadBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          closeLaunchedDropdowns();
          showDownloadBiaSnackbar();
        });
      }
    });
  }

  function syncLaunchedTableFromDraft() {
    if (!manualLaunchedTbody || !manualTableBody) return;
    manualLaunchedTbody.innerHTML = "";
    var rows = manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row");
    var n = rows.length;
    var signedSet = computeSignedRowIndicesSet(n);
    var signedCount = 0;
    var i;
    for (i = 0; i < n; i++) {
      if (signedSet[i]) signedCount++;
    }
    var pendingCount = n - signedCount;
    for (i = 0; i < n; i++) {
      var row = rows[i];
      var bailleur = getBailleurDraftCellText(row, 1);
      var sci = getBailleurDraftCellText(row, 2);
      var email = getBailleurDraftCellText(row, 3);
      var adr = getBailleurDraftCellText(row, 4);
      var signed = !!signedSet[i];
      var tr = document.createElement("tr");
      tr.setAttribute("data-cb-signed", signed ? "true" : "false");
      tr.innerHTML =
        '<td class="ds-table__td ds-table__td--checkbox">' +
        '<input type="checkbox" class="ds-table__checkbox" aria-label="Sélectionner cette ligne" /></td>' +
        '<td class="ds-table__td"><span class="cb-manual-bailleur-row__text cb-manual-bailleur-row__text--editable" contenteditable="true" spellcheck="false" role="textbox" tabindex="0">' +
        escapeHtmlManual(bailleur) +
        "</span></td>" +
        '<td class="ds-table__td"><span class="cb-manual-bailleur-row__text cb-manual-bailleur-row__text--editable" contenteditable="true" spellcheck="false" role="textbox" tabindex="0">' +
        escapeHtmlManual(sci) +
        "</span></td>" +
        '<td class="ds-table__td"><span class="cb-manual-bailleur-row__text cb-manual-bailleur-row__text--editable" contenteditable="true" spellcheck="false" role="textbox" tabindex="0">' +
        escapeHtmlManual(email) +
        "</span></td>" +
        '<td class="ds-table__td"><span class="cb-manual-bailleur-row__text cb-manual-bailleur-row__text--editable" contenteditable="true" spellcheck="false" role="textbox" tabindex="0">' +
        escapeHtmlManual(adr) +
        "</span></td>" +
        '<td class="ds-table__td">' +
        (signed
          ? '<span class="cb-manual-sig-tag cb-manual-sig-tag--signed">Signé</span>'
          : '<span class="cb-manual-sig-tag cb-manual-sig-tag--pending">En attente de signature</span>') +
        "</td>" +
        buildLaunchedRowActionsCell(signed);
      manualLaunchedTbody.appendChild(tr);
    }
    wireLaunchedRowMenus();
    updateLaunchedListDownloadMenuState();
    if (manualLaunchedCountEl) {
      manualLaunchedCountEl.textContent = "Nombre total de bailleurs : " + n;
    }
    if (manualLaunchedTabAll) manualLaunchedTabAll.textContent = String(n);
    if (manualLaunchedTabSigned) manualLaunchedTabSigned.textContent = String(signedCount);
    if (manualLaunchedTabPending) manualLaunchedTabPending.textContent = String(pendingCount);
    if (manualLaunchedSelectAll) {
      manualLaunchedSelectAll.disabled = n === 0;
      manualLaunchedSelectAll.checked = false;
    }
  }

  function hideLaunchSnackbarImmediate() {
    if (launchSnackbarTimer) {
      clearTimeout(launchSnackbarTimer);
      launchSnackbarTimer = null;
    }
    if (!launchSnackbar) return;
    launchSnackbar.classList.remove("is-open");
    launchSnackbar.setAttribute("hidden", "");
    launchSnackbar.setAttribute("aria-hidden", "true");
  }

  function scheduleLaunchSnackbarHide() {
    if (launchSnackbarTimer) {
      clearTimeout(launchSnackbarTimer);
      launchSnackbarTimer = null;
    }
    if (!launchSnackbar) return;
    if (!launchSnackbar.classList.contains("is-open")) return;
    launchSnackbar.classList.remove("is-open");
  }

  function populateLaunchSnackbarAndShow() {
    if (!launchSnackbar || !launchSnackbarTitle) return;
    var nom = (manualCampagneTitle && manualCampagneTitle.textContent.trim()) || "Campagne";
    launchSnackbarTitle.textContent = nom + " est lancée";
    if (launchSnackbarTimer) {
      clearTimeout(launchSnackbarTimer);
      launchSnackbarTimer = null;
    }
    launchSnackbar.removeAttribute("hidden");
    launchSnackbar.setAttribute("aria-hidden", "false");
    launchSnackbar.classList.remove("is-open");
    void launchSnackbar.offsetWidth;
    launchSnackbar.classList.add("is-open");
    launchSnackbarTimer = setTimeout(function () {
      launchSnackbarTimer = null;
      scheduleLaunchSnackbarHide();
    }, CB_MANUAL_LAUNCH_SNACKBAR_MS);
  }

  function applyCampagneLaunchedState() {
    var root = document.getElementById("cb-screen-bailleurs-manuel");
    if (!root || root.classList.contains("cb-manual-screen--launched")) return;
    syncLaunchedTableFromDraft();
    setManualLaunchedUI(true);
    var sessionRow = listRowSession;
    var launchDate = new Date().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    if (sessionRow && sessionRow._cbSnapshot) {
      syncSnapshotBailleursFromManualTable(sessionRow._cbSnapshot);
      sessionRow._cbSnapshot.status = "launched";
      sessionRow._cbSnapshot.dateLancement = launchDate;
      sessionRow._cbSnapshot.nDest = getManualBailleurRowCount();
      renderProtoCampagneListRow(sessionRow);
    }
    listRowSession = null;
    setTimeout(function () {
      populateLaunchSnackbarAndShow();
    }, 0);
  }

  if (manualSelectAll && manualTableBody) {
    manualSelectAll.addEventListener("change", function () {
      var checked = manualSelectAll.checked;
      manualTableBody.querySelectorAll("tr.cb-manual-bailleur-row .ds-table__checkbox").forEach(function (cb) {
        cb.checked = checked;
      });
      refreshManualBailleurSelectionUI();
    });
  }

  if (manualActionDelete) {
    manualActionDelete.addEventListener("click", deleteSelectedManualBailleurRows);
  }
  if (manualActionCancel) {
    manualActionCancel.addEventListener("click", clearManualBailleurSelection);
  }

  syncManualBailleursTableUI();
  wireManualBailleurEditableTables();

  if (lancerBackdrop) lancerBackdrop.addEventListener("click", closeLancerCampagneModal);
  if (lancerCloseBtn) lancerCloseBtn.addEventListener("click", closeLancerCampagneModal);
  if (lancerCancelBtn) lancerCancelBtn.addEventListener("click", closeLancerCampagneModal);
  if (lancerConfirmBtn) {
    lancerConfirmBtn.addEventListener("click", function () {
      applyCampagneLaunchedState();
      closeLancerCampagneModal();
    });
  }

  if (launchSnackbar) {
    launchSnackbar.addEventListener("transitionend", function (e) {
      if (e.target !== launchSnackbar) return;
      if (e.propertyName !== "transform") return;
      if (launchSnackbar.classList.contains("is-open")) return;
      launchSnackbar.setAttribute("hidden", "");
      launchSnackbar.setAttribute("aria-hidden", "true");
    });
  }
  if (launchSnackbarDismiss) {
    launchSnackbarDismiss.addEventListener("click", function () {
      scheduleLaunchSnackbarHide();
    });
  }
  if (launchSnackbarLink) {
    launchSnackbarLink.addEventListener("click", function () {
      hideLaunchSnackbarImmediate();
      var launchedMain = document.getElementById("cb-manual-main-launched");
      var target = launchedMain && launchedMain.querySelector(".cb-manual-screen__table-wrap");
      if (target) {
        try {
          target.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } catch (err) {
          target.scrollIntoView();
        }
      }
    });
  }

  if (manualLaunchedSelectAll && manualLaunchedTbody) {
    manualLaunchedSelectAll.addEventListener("change", function () {
      var checked = manualLaunchedSelectAll.checked;
      manualLaunchedTbody.querySelectorAll(".ds-table__checkbox").forEach(function (cb) {
        cb.checked = checked;
      });
    });
  }

  if (launchedListActionsBtn && launchedListActionsMenu) {
    launchedListActionsBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleLaunchedDropdown(launchedListActionsBtn, launchedListActionsMenu);
    });
  }
  if (launchedDownloadAllBtn) {
    launchedDownloadAllBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (launchedDownloadAllBtn.disabled) return;
      closeLaunchedDropdowns();
      showDownloadBiaSnackbar();
    });
  }
  if (downloadSnackbar) {
    downloadSnackbar.addEventListener("transitionend", function (e) {
      if (e.target !== downloadSnackbar) return;
      if (e.propertyName !== "transform") return;
      if (downloadSnackbar.classList.contains("is-open")) return;
      downloadSnackbar.setAttribute("hidden", "");
      downloadSnackbar.setAttribute("aria-hidden", "true");
    });
  }
  if (downloadSnackbarDismiss) {
    downloadSnackbarDismiss.addEventListener("click", function () {
      hideDownloadSnackbarImmediate();
    });
  }
  if (manualBtnLancer) {
    manualBtnLancer.addEventListener("click", function () {
      if (manualBtnLancer.disabled) return;
      openLancerCampagneModal();
    });
  }

  if (backManualList) {
    backManualList.addEventListener("click", hideManualBailleursScreen);
  }
  if (manualAddRow) {
    manualAddRow.addEventListener("click", addManualBailleurRow);
  }

  attachProtoCampagneListInteractions();

  if (dialog) {
    dialog.querySelectorAll('input[name="cb-campagne-source"]').forEach(function (radio) {
      radio.addEventListener("change", onSourceChange);
    });
  }

  if (fieldNom) {
    fieldNom.addEventListener("input", refreshCreerCampagneEnabled);
  }
  if (fieldTaux) {
    fieldTaux.addEventListener("input", refreshCreerCampagneEnabled);
  }

  if (openBtn) {
    openBtn.addEventListener("click", openModal);
  }
  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (btnCancel) btnCancel.addEventListener("click", onCancel);
  if (btnNext) btnNext.addEventListener("click", onNext);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  if (fileInput) {
    fileInput.addEventListener("change", syncFileUploadUI);
  }
  if (uploadBrowseBtn && fileInput) {
    uploadBrowseBtn.addEventListener("click", function () {
      fileInput.click();
    });
  }
  if (uploadRemoveBtn && fileInput) {
    uploadRemoveBtn.addEventListener("click", function () {
      fileInput.value = "";
      syncFileUploadUI();
    });
  }
  if (uploadChevronBtn) {
    uploadChevronBtn.addEventListener("click", function () {
      setFilePanelExpanded(!filePanelExpanded);
    });
  }

  if (produitBtn && produitListbox) {
    produitBtn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      if (produitDropdownOpen) closeProduitDropdown();
      else openProduitDropdown();
    });
  }
  if (produitOption && produitBtn) {
    produitOption.addEventListener("click", function (ev) {
      ev.stopPropagation();
      var pv = produitOption.getAttribute("data-value");
      if (produitDisplay && pv) produitDisplay.textContent = pv;
      produitBtn.classList.add("cb-modal__pseudo-field--has-value");
      closeProduitDropdown();
      refreshCreerCampagneEnabled();
    });
  }

  if (contratBtn && contratListbox) {
    contratBtn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      if (contratDropdownOpen) closeContratDropdown();
      else openContratDropdown();
    });
  }
  if (contratOption && contratBtn) {
    contratOption.addEventListener("click", function (ev) {
      ev.stopPropagation();
      var v = contratOption.getAttribute("data-value");
      if (contratDisplay && v) contratDisplay.textContent = v;
      contratBtn.classList.add("cb-modal__pseudo-field--has-value");
      closeContratDropdown();
      refreshCreerCampagneEnabled();
    });
  }

  document.addEventListener("click", function (e) {
    if (openLaunchedDropdownPanel) {
      var inMenu =
        (openLaunchedDropdownPanel && openLaunchedDropdownPanel.contains(e.target)) ||
        (openLaunchedDropdownTrigger && openLaunchedDropdownTrigger.contains(e.target));
      if (!inMenu) closeLaunchedDropdowns();
    }
    if (contratDropdownOpen && contratCombo && !contratCombo.contains(e.target)) {
      closeContratDropdown();
    }
    if (produitDropdownOpen && produitCombo && !produitCombo.contains(e.target)) {
      closeProduitDropdown();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (dialogLancer && !dialogLancer.hasAttribute("hidden")) {
      closeLancerCampagneModal();
      return;
    }
    if (openLaunchedDropdownPanel) {
      closeLaunchedDropdowns();
      return;
    }
    if (manualScreen && !manualScreen.hasAttribute("hidden")) {
      hideManualBailleursScreen();
      return;
    }
    if (dialog && !dialog.hasAttribute("hidden")) {
      if (produitDropdownOpen) {
        closeProduitDropdown();
        return;
      }
      if (contratDropdownOpen) {
        closeContratDropdown();
        return;
      }
      closeModal();
    }
  });
})();
