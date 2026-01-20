
const DRUG_DATABASE = {
    // NSAIDs (Non-Steroidal Anti-Inflammatory Drugs)
    'ibuprofen': {
        contraindications: ['hypertension', 'renal_impairment', 'pregnancy'],
        warnings: {
            'hypertension': 'NSAIDs may increase blood pressure and cardiovascular risk. Monitor BP closely.',
            'renal_impairment': 'NSAIDs can worsen kidney function. Consider dose reduction or alternative.',
            'pregnancy': 'Avoid in third trimester - risk of premature closure of ductus arteriosus.'
        },
        source: 'WHO EML / FDA'
    },
    'diclofenac': {
        contraindications: ['hypertension', 'renal_impairment', 'liver_disease'],
        warnings: {
            'hypertension': 'NSAIDs may increase blood pressure. Monitor cardiovascular status.',
            'renal_impairment': 'Risk of acute kidney injury. Use with caution.',
            'liver_disease': 'May cause hepatotoxicity. Monitor liver function.'
        },
        source: 'WHO EML / FDA'
    },
    'aspirin': {
        contraindications: ['asthma', 'pregnancy', 'renal_impairment'],
        warnings: {
            'asthma': 'Risk of bronchospasm in aspirin-sensitive asthma patients.',
            'pregnancy': 'Avoid in third trimester - bleeding risk and ductus arteriosus issues.',
            'renal_impairment': 'May worsen renal function at high doses.'
        },
        source: 'WHO EML / FDA'
    },
    
    // Antidiabetic medications
    'metformin': {
        contraindications: ['renal_impairment', 'liver_disease'],
        warnings: {
            'renal_impairment': 'Risk of lactic acidosis. Contraindicated in severe renal impairment (eGFR <30).',
            'liver_disease': 'Increased risk of lactic acidosis. Avoid in severe hepatic impairment.'
        },
        source: 'WHO EML / FDA'
    },
    'glibenclamide': {
        contraindications: ['renal_impairment', 'liver_disease'],
        warnings: {
            'renal_impairment': 'Risk of prolonged hypoglycemia. Consider shorter-acting alternatives.',
            'liver_disease': 'Increased hypoglycemia risk due to reduced metabolism.'
        },
        source: 'WHO EML'
    },
    
    // Antihypertensive medications
    'enalapril': {
        contraindications: ['pregnancy', 'renal_impairment'],
        warnings: {
            'pregnancy': 'ACE inhibitors are contraindicated - risk of fetal toxicity and death.',
            'renal_impairment': 'Monitor renal function closely. May cause hyperkalemia.'
        },
        source: 'WHO EML / FDA'
    },
    'lisinopril': {
        contraindications: ['pregnancy', 'renal_impairment'],
        warnings: {
            'pregnancy': 'ACE inhibitors can cause fetal harm. Contraindicated in all trimesters.',
            'renal_impairment': 'Dose adjustment required. Risk of acute renal failure.'
        },
        source: 'FDA'
    },
    
    // Antibiotics
    'amoxicillin': {
        contraindications: [],
        warnings: {}
        // Generally safe, no major contraindications in our limited condition set
    },
    'ciprofloxacin': {
        contraindications: ['pregnancy'],
        warnings: {
            'pregnancy': 'Quinolones should be avoided - risk of arthropathy in fetus.',
        },
        source: 'WHO EML / FDA'
    },
    
    // Analgesics
    'paracetamol': {
        contraindications: ['liver_disease'],
        warnings: {
            'liver_disease': 'Use with caution - risk of hepatotoxicity. Reduce dose in severe impairment.'
        },
        source: 'WHO EML'
    },
    
    // Corticosteroids
    'prednisolone': {
        contraindications: ['diabetes', 'hypertension'],
        warnings: {
            'diabetes': 'Steroids increase blood glucose. Monitor closely and adjust antidiabetic therapy.',
            'hypertension': 'May worsen blood pressure control. Monitor BP regularly.'
        },
        source: 'WHO EML / FDA'
    },
    
    // Beta blockers
    'atenolol': {
        contraindications: ['asthma', 'diabetes'],
        warnings: {
            'asthma': 'Beta blockers can cause bronchospasm. Use cardioselective agents with caution.',
            'diabetes': 'May mask hypoglycemia symptoms. Monitor blood glucose carefully.'
        },
        source: 'WHO EML'
    }
};

// Common drug name variations and mappings
const DRUG_ALIASES = {
    'acetaminophen': 'paracetamol',
    'tylenol': 'paracetamol',
    'advil': 'ibuprofen',
    'motrin': 'ibuprofen',
    'voltaren': 'diclofenac'
};

// Additional brand -> generic mappings (expanded from Python snippet)
const BRAND_TO_GENERIC = {
    'calpol': 'paracetamol',
    'crocin': 'paracetamol',
    'dolo': 'paracetamol',
    'brufen': 'ibuprofen',
    'combiflam': 'ibuprofen + paracetamol',
    'volini': 'diclofenac',
    'diclofenac': 'diclofenac',
    'augmentin': 'amoxicillin + clavulanic acid',
    'amoxil': 'amoxicillin',
    'cefixime': 'cefixime',
    'azithral': 'azithromycin',
    'cetzine': 'cetirizine',
    'allegra': 'fexofenadine',
    'loratidine': 'loratadine',
    'ranitidine': 'ranitidine',
    'omeprazole': 'omeprazole',
    'pantoprazole': 'pantoprazole',
    'metformin': 'metformin',
    'glucophage': 'metformin',
    'insulin': 'insulin',
    'atenolol': 'atenolol',
    'losartan': 'losartan',
    'amlodipine': 'amlodipine',
    'simvastatin': 'simvastatin',
    'atorvastatin': 'atorvastatin',
    'prednisolone': 'prednisolone',
    'hydrocortisone': 'hydrocortisone',
    'salbutamol': 'salbutamol',
    'ventolin': 'salbutamol'
};

const MEDICINES_GENERIC = new Set(Object.values(BRAND_TO_GENERIC));

// ============================================
// COMMON MEDICINES LIST
// Comprehensive list of common medicines for accurate name extraction
// ============================================

const COMMON_MEDICINES = [
    // Analgesics and Antipyretics
    'paracetamol', 'acetaminophen', 'ibuprofen', 'aspirin', 'diclofenac', 'naproxen',
    'tramadol', 'morphine', 'codeine', 'ketorolac', 'piroxicam', 'indomethacin',
    
    // Antibiotics
    'amoxicillin', 'amoxicillin-clavulanate', 'augmentin', 'azithromycin', 'ciprofloxacin',
    'levofloxacin', 'cephalexin', 'cefixime', 'ceftriaxone', 'doxycycline', 'metronidazole',
    'erythromycin', 'clarithromycin', 'penicillin', 'ampicillin', 'cloxacillin', 'ofloxacin',
    'norfloxacin', 'nitrofurantoin', 'co-trimoxazole', 'trimethoprim', 'sulfamethoxazole',
    
    // Antihistamines and Allergy
    'cetirizine', 'loratadine', 'fexofenadine', 'chlorpheniramine', 'diphenhydramine',
    'promethazine', 'levocetirizine', 'desloratadine', 'hydroxyzine',
    
    // Antacids and GI medications
    'omeprazole', 'pantoprazole', 'lansoprazole', 'esomeprazole', 'ranitidine',
    'famotidine', 'domperidone', 'ondansetron', 'metoclopramide', 'loperamide',
    'bismuth subsalicylate', 'antacid', 'sucralfate', 'rabeprazole',
    
    // Antidiabetic
    'metformin', 'glibenclamide', 'gliclazide', 'glimepiride', 'insulin', 'sitagliptin',
    'vildagliptin', 'pioglitazone', 'repaglinide', 'empagliflozin', 'dapagliflozin',
    
    // Antihypertensive
    'amlodipine', 'atenolol', 'metoprolol', 'propranolol', 'enalapril', 'lisinopril',
    'losartan', 'telmisartan', 'valsartan', 'ramipril', 'perindopril', 'nifedipine',
    'diltiazem', 'verapamil', 'hydrochlorothiazide', 'furosemide', 'spironolactone',
    
    // Respiratory
    'salbutamol', 'albuterol', 'ipratropium', 'budesonide', 'beclomethasone',
    'fluticasone', 'montelukast', 'theophylline', 'aminophylline', 'guaifenesin',
    'dextromethorphan', 'bromhexine', 'ambroxol', 'acetylcysteine',
    
    // Steroids
    'prednisolone', 'prednisone', 'dexamethasone', 'hydrocortisone', 'betamethasone',
    'methylprednisolone', 'deflazacort',
    
    // Vitamins and Supplements
    'vitamin d', 'vitamin b12', 'vitamin c', 'folic acid', 'iron', 'calcium', 'zinc',
    'multivitamin', 'vitamin b complex', 'omega-3', 'biotin',
    
    // Cardiac
    'aspirin', 'clopidogrel', 'atorvastatin', 'rosuvastatin', 'simvastatin',
    'digoxin', 'isosorbide', 'nitroglycerin', 'warfarin', 'rivaroxaban',
    
    // Antifungal
    'fluconazole', 'ketoconazole', 'clotrimazole', 'miconazole', 'itraconazole',
    'terbinafine', 'griseofulvin',
    
    // Antiparasitic
    'albendazole', 'mebendazole', 'ivermectin', 'praziquantel',
    
    // Others
    'levothyroxine', 'thyroxine', 'allopurinol', 'colchicine', 'gabapentin',
    'pregabalin', 'diazepam', 'alprazolam', 'clonazepam', 'phenytoin',
    'carbamazepine', 'valproate', 'levetiracetam', 'tamsulosin', 'finasteride'
];

// Medicine name variations and common forms
const MEDICINE_FORMS = [
    'tablet', 'tab', 'capsule', 'cap', 'syrup', 'suspension', 'injection', 'inj',
    'drops', 'cream', 'ointment', 'gel', 'inhaler', 'powder', 'granules',
    'solution', 'lotion', 'spray'
];

// ============================================
// FILE ANALYSIS SIMULATION
// This simulates extracting medical conditions from uploaded files
// In production, this would use OCR, NLP, or structured data extraction
// ============================================

const CONDITION_KEYWORDS = {
    'hypertension': ['hypertension', 'high blood pressure', 'bp:', 'elevated bp', 'htn', 'blood pressure'],
    'diabetes': ['diabetes', 'diabetic', 'blood sugar', 'glucose', 'hba1c', 'insulin', 'type 2 dm', 'type 1 dm', 'hyperglycemia'],
    'pregnancy': ['pregnancy', 'pregnant', 'antenatal', 'prenatal', 'gestation', 'obstetric', 'trimester'],
    'renal_impairment': ['renal', 'kidney', 'creatinine', 'gfr', 'chronic kidney disease', 'ckd', 'nephropathy', 'renal failure'],
    'liver_disease': ['liver', 'hepatic', 'cirrhosis', 'hepatitis', 'alt', 'ast', 'bilirubin', 'jaundice', 'liver function'],
    'asthma': ['asthma', 'bronchial', 'wheezing', 'bronchodilator', 'inhaler', 'respiratory', 'copd']
};

function simulateFileAnalysis(fileName) {
    // Simulate extraction by analyzing filename and returning likely conditions
    // In real system, this would parse file contents using OCR/NLP
    const lowerFileName = fileName.toLowerCase();
    const detectedConditions = [];
    
    for (const [condition, keywords] of Object.entries(CONDITION_KEYWORDS)) {
        for (const keyword of keywords) {
            if (lowerFileName.includes(keyword)) {
                if (!detectedConditions.includes(condition)) {
                    detectedConditions.push(condition);
                }
                break;
            }
        }
    }
    
    return detectedConditions;
}

// Helper to read file as data URL (returns promise)
function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getCurrentUserId() {
    return localStorage.getItem('currentUserId');
}

function getCurrentRole() {
    return localStorage.getItem('currentRole');
}
// ============================================
// SUPABASE DB FUNCTIONS (REPLACES localStorage patients)
// ============================================

async function dbGetPatient(patientId) {
  const { data, error } = await supabaseClient
    .from("patients")
    .select("*")
    .eq("id", patientId.toUpperCase())
    .maybeSingle();

  if (error) {
    console.error("dbGetPatient error:", error);
    return null; // IMPORTANT
  }

  return data;
}


async function dbCreatePatientIfNotExists(patientId) {
  patientId = patientId.toUpperCase();

  const existing = await dbGetPatient(patientId);
  if (existing) return existing;

  const { data, error } = await supabaseClient
  .from("patients")
  .insert([{ id: patientId }])
  .select()
  .single();

if (error) {
  console.error("Insert patient error:", error);

  // ✅ Duplicate key = patient already exists
  if (error.code === "23505") {
    return await dbGetPatient(patientId);
  }

  throw error;
}

return data;

}

async function dbUpdatePatient(patientId, updateObj) {
  const { error } = await supabaseClient
    .from("patients")
    .update(updateObj)
    .eq("id", patientId.toUpperCase());

  if (error) throw error;
}

async function dbGetConditions(patientId) {
  const { data, error } = await supabaseClient
    .from("patient_conditions")
    .select("condition_key")
    .eq("patient_id", patientId.toUpperCase());

  if (error) throw error;
  return (data || []).map(x => x.condition_key);
}

async function dbAddConditions(patientId, conditions) {
  patientId = patientId.toUpperCase();
  if (!conditions || conditions.length === 0) return;

  // Get existing conditions
  const existing = new Set(await dbGetConditions(patientId));

  const toInsert = conditions.filter(c => !existing.has(c)).map(c => ({
    patient_id: patientId,
    condition_key: c
  }));

  if (toInsert.length === 0) return;

  const { error } = await supabaseClient
    .from("patient_conditions")
    .insert(toInsert);

  if (error) throw error;
}
// ============================================
// AUTHENTICATION & NAVIGATION
// ============================================

async function loginAsPatient() {
  const patientIdInput = document.getElementById("patientIdInput").value.trim();

  if (!patientIdInput) {
    alert("Please enter a Patient ID");
    return;
  }

  if (patientIdInput.length < 3) {
    alert("Patient ID must be at least 3 characters long");
    return;
  }

  const patientId = patientIdInput.toUpperCase();

  try {
    await dbCreatePatientIfNotExists(patientId);

    localStorage.setItem("currentUserId", patientId);
    localStorage.setItem("currentRole", "patient");

    window.location.href = "patient.html";
  } catch (e) {
    console.error(e);
    alert("Database error. Check console.");
  }
}

function loginAsDoctor() {
    const doctorId = 'DOC' + Date.now();
    localStorage.setItem('currentUserId', doctorId);
    localStorage.setItem('currentRole', 'doctor');
    
    window.location.href = 'doctor.html';
}

function logout() {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentRole');
    window.location.href = 'index.html';
}

// ============================================
// PATIENT DASHBOARD FUNCTIONS
// ============================================
// ============================================
// PATIENT PRESCRIPTIONS VIEW (FROM DB)
// ============================================
async function displayPatientPrescriptionsFromDB(patientId) {
  const container = document.getElementById("prescriptionsList");
  if (!container) return;

  const { data, error } = await supabaseClient
    .from("prescriptions")
    .select("*")
    .eq("patient_id", patientId.toUpperCase())
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Prescriptions load failed:", error);
    container.innerHTML = `<p class="empty-state">Failed to load prescriptions</p>`;
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = `<p class="empty-state">No prescriptions yet. Visit your doctor to get started.</p>`;
    return;
  }

  container.innerHTML = data.map(p => `
    <div class="prescription-card">
      <div style="display:flex;justify-content:space-between;gap:10px;">
        <strong>Prescription</strong>
        <span style="color: var(--color-text-light); font-size: 12px;">
          ${new Date(p.created_at || p.date || Date.now()).toLocaleDateString()}
        </span>
      </div>
      <pre style="white-space:pre-wrap; margin-top:10px;">${p.content || "No content"}</pre>
      ${p.doctor_notes ? `<div style="margin-top:10px; font-size: 13px; color: var(--color-text-light);">
        <strong>Doctor Notes:</strong> ${p.doctor_notes}
      </div>` : ""}
    </div>
  `).join("");
}


async function initializePatientDashboard() {
  const role = getCurrentRole();
  if (role !== "patient") {
    window.location.href = "index.html";
    return;
  }

  const patientId = getCurrentUserId();
  try {
  const patientData = await dbCreatePatientIfNotExists(patientId);

  patientData.conditions = [];

  document.getElementById("patientIdDisplay").textContent = patientId;

  // ✅ Reports
  try {
    await displayUploadedFilesFromDB(patientId);
  } catch (err) {
    console.error("Reports load failed:", err);
  }

  // ✅ Conditions
  try {
    patientData.conditions = await dbGetConditions(patientId);
    displayExtractedConditions(patientData);
  } catch (err) {
    console.error("Conditions load failed:", err);
  }

  // ✅ Prescriptions
  try {
    await displayPatientPrescriptionsFromDB(patientId);
  } catch (err) {
    console.error("Prescriptions load failed:", err);
  }

} catch (e) {
  console.error(e);
  alert("Dashboard init failed. Check console.");
}

}


function displayExtractedConditions(patientData) {
    const container = document.getElementById('extractedConditions');
    
    if (patientData.conditions.length === 0) {
        container.innerHTML = '<span style="color: var(--color-text-light); font-style: italic;">No conditions extracted yet. Upload medical files.</span>';
        return;
    }
    
    const conditionLabels = {
        'hypertension': 'Hypertension',
        'diabetes': 'Diabetes',
        'pregnancy': 'Pregnancy',
        'renal_impairment': 'Renal Impairment',
        'liver_disease': 'Liver Disease',
        'asthma': 'Asthma'
    };
    
    container.innerHTML = patientData.conditions.map(condition => 
        `<span class="condition-flag">${conditionLabels[condition] || condition}</span>`
    ).join('');
}
async function uploadReports() {
  const fileInput = document.getElementById("fileUpload");
  const files = fileInput.files;

  if (files.length === 0) {
    alert("Please select files to upload");
    return;
  }

  const patientId = getCurrentUserId();

  try {
    await dbCreatePatientIfNotExists(patientId);

    let newConditionsDetected = [];

    for (let file of files) {
      // 1) Extract conditions (your existing logic)
      const detectedConditions = simulateFileAnalysis(file.name);

      if (detectedConditions.length > 0) {
        newConditionsDetected.push(...detectedConditions);
        await dbAddConditions(patientId, detectedConditions);
      }

      // ✅ 2) Upload file to Supabase Storage
      const filePath = `${patientId.toUpperCase()}/${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabaseClient.storage
        .from("patient_reports")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // ✅ 3) Store metadata + file_path in DB
      const { error } = await supabaseClient.from("reports").insert([{
        patient_id: patientId.toUpperCase(),
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_path: filePath     // ✅ ADD THIS
      }]);

      if (error) throw error;
    }

    fileInput.value = "";
    alert("Reports uploaded successfully!");

    // refresh dashboard UI
    await initializePatientDashboard();

  } catch (e) {
    console.error(e);
    alert("Upload failed. Check console.");
  }
}


function displayUploadedFiles(patientData) {
    const container = document.getElementById('uploadedFiles');
    
    if (patientData.reports.length === 0) {
        container.innerHTML = '<p class="empty-state">No reports uploaded yet</p>';
        return;
    }
    
    const conditionLabels = {
        'hypertension': 'Hypertension',
        'diabetes': 'Diabetes',
        'pregnancy': 'Pregnancy',
        'renal_impairment': 'Renal Impairment',
        'liver_disease': 'Liver Disease',
        'asthma': 'Asthma'
    };
    
    container.innerHTML = patientData.reports.map((report, index) => {
        const extractedText = report.extractedConditions && report.extractedConditions.length > 0 
            ? `<div style="margin-top: var(--spacing-xs); font-size: var(--font-size-small); color: var(--color-success);">
                ✓ Extracted: ${report.extractedConditions.map(c => conditionLabels[c] || c).join(', ')}
               </div>`
            : '';

        // If dataUrl present, provide preview/link
        let previewHtml = '';
        if (report.dataUrl) {
            if (report.type && report.type.startsWith('image/')) {
                previewHtml = `<div style="margin-top: var(--spacing-sm);"><img src="${report.dataUrl}" alt="${report.name}" style="max-width:200px; border-radius:6px;"/></div>`;
            } else {
                previewHtml = `<div style="margin-top: var(--spacing-sm);"><a href="${report.dataUrl}" target="_blank" download="${report.name}">View / Download</a></div>`;
            }
        } else if (report.size > 0 && report.size > 2.5 * 1024 * 1024) {
            previewHtml = `<div style="margin-top: var(--spacing-sm); font-size: var(--font-size-small); color: var(--color-text-light);">File is large and not stored locally.</div>`;
        }

        return `
            <div class="file-item">
                <div>
                    <div>📄 ${report.name} (${(report.size / 1024).toFixed(1)} KB)</div>
                    ${extractedText}
                    ${previewHtml}
                </div>
                <span style="color: var(--color-text-light); font-size: var(--font-size-small);">
                    ${new Date(report.uploadedAt).toLocaleDateString()}
                </span>
            </div>
        `;
    }).join('');
}

async function displayUploadedFilesFromDB(patientId) {
  const container = document.getElementById("uploadedFiles");

  const { data, error } = await supabaseClient
    .from("reports")
    .select("*")
    .eq("patient_id", patientId.toUpperCase())
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error(error);
    container.innerHTML = "<p class='empty-state'>Failed to load reports</p>";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p class='empty-state'>No reports uploaded yet</p>";
    return;
  }

  container.innerHTML = data.map(report => {
    // ✅ Generate public URL from Supabase storage
    let fileUrl = "";
    if (report.file_path) {
      const { data: urlData } = supabaseClient.storage
        .from("patient_reports")
        .getPublicUrl(report.file_path);

      fileUrl = urlData.publicUrl;
    }

    return `
      <div class="file-item">
        <div>
          <div>📄 ${report.file_name} (${(report.file_size / 1024).toFixed(1)} KB)</div>

          ${
            fileUrl
              ? `<a href="${fileUrl}" target="_blank" style="color:blue; font-size: 14px;">
                    View / Download
                 </a>`
              : `<span style="color:gray; font-size: 12px;">No file link found</span>`
          }
        </div>

        <span style="color: var(--color-text-light); font-size: var(--font-size-small);">
          ${new Date(report.uploaded_at).toLocaleDateString()}
        </span>
      </div>
    `;
  }).join("");
}

// ============================================
// DOCTOR DASHBOARD FUNCTIONS
// ============================================

let currentPatientId = null;
let recognitionInstance = null;
let medicineCounter = 0;

function initializeDoctorDashboard() {
    const role = getCurrentRole();
    if (role !== 'doctor') {
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize with one medicine field
    addMedicineField();
    
    // Check for Web Speech API support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-IN';
        
        recognitionInstance.onresult = handleSpeechResult;
        recognitionInstance.onerror = handleSpeechError;
        recognitionInstance.onend = handleSpeechEnd;
    } else {
        // Disable voice button if not supported
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.disabled = true;
            voiceBtn.textContent = '🎤 Voice Not Supported';
        }
    }
}

async function loadPatient() {
  const patientIdInput = document.getElementById("patientIdInput").value.trim();

  if (!patientIdInput) {
    alert("Please enter a Patient ID");
    return;
  }

  try {
    const patientData = await dbGetPatient(patientIdInput);

    if (!patientData) {
      alert("Patient not found. Please check the ID and try again.");
      return;
    }

    currentPatientId = patientIdInput.toUpperCase();

    document.getElementById("patientInfoSection").classList.remove("hidden");
    document.getElementById("prescriptionSection").classList.remove("hidden");
    document.getElementById("currentPatientId").textContent = currentPatientId;

    document.getElementById("patientName").value = patientData.name || "";
    document.getElementById("patientAge").value = patientData.age || "";
    document.getElementById("patientGender").value = patientData.gender || "";

    // load conditions
    patientData.conditions = await dbGetConditions(currentPatientId);

    displayPatientDisclaimers(patientData);

    // reports
    await displayPatientReportsFromDB(currentPatientId);

    clearPrescription();
    document.getElementById("warningSection").classList.add("hidden");
    document.getElementById("successMessage").classList.add("hidden");

  } catch (e) {
    console.error(e);
    alert("Error loading patient from DB.");
  }
}

async function savePatientDemographics() {
  if (!currentPatientId) {
    alert("Please load a patient first");
    return;
  }

  try {
    const name = document.getElementById("patientName").value.trim();
    const age = document.getElementById("patientAge").value.trim();
    const gender = document.getElementById("patientGender").value;

    await dbUpdatePatient(currentPatientId, {
      name,
      age: age ? parseInt(age) : null,
      gender
    });

    alert("Patient demographics saved successfully!");
  } catch (e) {
    console.error(e);
    alert("Error saving demographics.");
  }
}


function displayPatientDisclaimers(patientData) {
    const container = document.getElementById('patientDisclaimers');
    
    if (patientData.conditions.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-light); font-style: italic;">No medical conditions detected from patient records</p>';
        return;
    }
    
    const conditionLabels = {
        'hypertension': 'Hypertension (High Blood Pressure)',
        'diabetes': 'Diabetes Mellitus',
        'pregnancy': 'Pregnancy',
        'renal_impairment': 'Renal/Kidney Impairment',
        'liver_disease': 'Liver Disease',
        'asthma': 'Asthma/Respiratory Condition'
    };
    
    const disclaimerAdvice = {
        'hypertension': 'Avoid NSAIDs (Ibuprofen, Diclofenac) - may increase BP. Monitor cardiovascular status.',
        'diabetes': 'Monitor blood glucose if prescribing steroids or beta blockers. Check renal function for Metformin.',
        'pregnancy': 'AVOID: ACE inhibitors, NSAIDs (3rd trimester), Quinolones. Use pregnancy-safe alternatives.',
        'renal_impairment': 'Dose adjustment required for many drugs. Avoid Metformin if eGFR <30. Caution with NSAIDs.',
        'liver_disease': 'Reduce doses of hepatically metabolized drugs. Monitor liver function. Avoid Paracetamol in severe cases.',
        'asthma': 'Avoid non-selective beta blockers. Caution with Aspirin in aspirin-sensitive asthma.'
    };
    
    container.innerHTML = patientData.conditions.map(condition => `
        <div class="disclaimer-item">
            <div class="disclaimer-condition">${conditionLabels[condition] || condition}</div>
            <div class="disclaimer-advice">${disclaimerAdvice[condition] || 'Exercise caution when prescribing.'}</div>
            <div class="disclaimer-source">Based on patient's uploaded medical records</div>
        </div>
    `).join('');
}
async function displayPatientReportsFromDB(patientId) {
  const container = document.getElementById("patientReports");

  const { data, error } = await supabaseClient
    .from("reports")
    .select("*")
    .eq("patient_id", patientId.toUpperCase())
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error(error);
    container.innerHTML =
      "<p style='color: var(--color-text-light); font-size: var(--font-size-small);'>Failed to load reports</p>";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML =
      "<p style='color: var(--color-text-light); font-size: var(--font-size-small);'>No medical files uploaded by patient</p>";
    return;
  }

  container.innerHTML =
    '<div style="display:flex;flex-direction:column;gap:var(--spacing-sm);">' +
    data
      .map((r) => {
        // ✅ Create view/download URL
        let fileUrl = r.file_url || "";

        // ✅ If file_url not stored, derive from storage using file_path
        if (!fileUrl && r.file_path) {
          const { data: urlData } = supabaseClient.storage
            .from("patient_reports")
            .getPublicUrl(r.file_path);

          fileUrl = urlData?.publicUrl || "";
        }

        return `
          <div style="background-color: var(--color-background); padding: var(--spacing-sm); border-radius: var(--radius-sm);">
            <div style="display:flex; justify-content:space-between; align-items:center; gap: var(--spacing-md);">
              
              <div style="flex:1;">
                <div>📄 ${r.file_name}</div>
                <div style="margin-top: var(--spacing-xs); font-size: var(--font-size-small); color: var(--color-text-light);">
                  ${r.file_size ? (r.file_size / 1024).toFixed(1) + " KB" : ""}
                </div>
              </div>

              <div style="display:flex; gap:10px; align-items:center;">
                <span style="color: var(--color-text-light); font-size: var(--font-size-small); white-space: nowrap;">
                  ${new Date(r.uploaded_at || Date.now()).toLocaleDateString()}
                </span>

                ${
                  fileUrl
                    ? `<a class="btn-secondary" href="${fileUrl}" target="_blank" rel="noopener noreferrer">
                        👁️ View
                      </a>`
                    : `<span style="color:gray; font-size:12px;">No link</span>`
                }
              </div>
            </div>
          </div>
        `;
      })
      .join("") +
    "</div>";
}



async function downloadReport(reportId, fileName) {
  try {
    // Get the file data from the database
    const { data, error } = await supabaseClient
      .from("reports")
      .select("file_data")
      .eq("id", reportId)
      .single();

    if (error || !data) {
      alert("Failed to download report");
      console.error(error);
      return;
    }

    // Check if file_data is a data URL or base64
    let binaryString;
    if (data.file_data.startsWith('data:')) {
      // It's a data URL, extract the base64 part
      const base64Part = data.file_data.split(',')[1];
      binaryString = atob(base64Part);
    } else {
      // It's already base64
      binaryString = atob(data.file_data);
    }

    // Convert binary string to byte array
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create a blob and download
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("Download error:", e);
    alert("Error downloading report");
  }
}
// ============================================
// MEDICINE FIELD MANAGEMENT
// ============================================

function addMedicineField() {
    medicineCounter++;
    const medicinesList = document.getElementById('medicinesList');
    
    const medicineDiv = document.createElement('div');
    medicineDiv.className = 'medicine-card';
    medicineDiv.id = `medicine-${medicineCounter}`;
    medicineDiv.innerHTML = `
        <div class="medicine-header">
            <span class="medicine-number">${medicineCounter}.</span>
            ${medicineCounter > 1 ? `<button class="btn-remove" onclick="removeMedicineField(${medicineCounter})">✕</button>` : ''}
        </div>
        <div class="medicine-fields">
            <div class="form-group">
                <label>Brand Name (if any)</label>
                <input type="text" class="input-field medicine-brand" placeholder="e.g., Tylenol, Advil" oninput="brandChanged(this)">
            </div>
            <div class="form-group">
                <label>Biomolecule / Generic Name</label>
                <input type="text" class="input-field medicine-molecule" placeholder="e.g., Paracetamol" readonly>
            </div>
            <div class="form-group">
                <label>Associated Diagnosis</label>
                <input type="text" class="input-field medicine-diagnosis" placeholder="e.g., Viral fever" readonly>
            </div>
            <div class="form-group medicine-name-group">
                <label>Medicine Name</label>
                <input type="text" class="input-field medicine-name" placeholder="e.g., Paracetamol (Tab)" 
                    oninput="checkAllDrugInteractions()">
            </div>
            <div class="form-group">
                <label>Dosage</label>
                <input type="text" class="input-field medicine-dosage" placeholder="500mg">
            </div>
            <div class="form-group">
                <label>Route</label>
                <select class="input-field medicine-route">
                    <option value="Oral">Oral</option>
                    <option value="Topical">Topical</option>
                    <option value="IV">IV</option>
                    <option value="IM">IM</option>
                    <option value="Sublingual">Sublingual</option>
                    <option value="Inhaled">Inhaled</option>
                </select>
            </div>
            <div class="form-group">
                <label>Frequency</label>
                <input type="text" class="input-field medicine-frequency" placeholder="Twice daily">
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" class="input-field medicine-duration" placeholder="5 days">
            </div>
            <div class="form-group medicine-timing-group">
                <label>Timing</label>
                <select class="input-field medicine-timing">
                    <option value="">Select</option>
                    <option value="Before food">Before food</option>
                    <option value="After food">After food</option>
                    <option value="With food">With food</option>
                    <option value="Empty stomach">Empty stomach</option>
                    <option value="At bedtime">At bedtime</option>
                    <option value="As needed">As needed (SOS)</option>
                </select>
            </div>
        </div>
    `;
    
    medicinesList.appendChild(medicineDiv);
}

function brandChanged(inputElem) {
    // When the brand input is edited, auto-fill the biomolecule/generic if known
    const brand = inputElem.value.trim().toLowerCase();
    const card = inputElem.closest('.medicine-card');
    const moleculeInput = card ? card.querySelector('.medicine-molecule') : null;
    const nameInput = card ? card.querySelector('.medicine-name') : null;

    if (!moleculeInput) return;

    if (!brand) {
        moleculeInput.value = '';
        return;
    }

    // Check alias mapping
    for (const [alias, actual] of Object.entries(DRUG_ALIASES)) {
        if (brand.includes(alias) || alias.includes(brand)) {
            moleculeInput.value = capitalizeWords(actual);
            // also populate the medicine-name (generic) for safety checks
            if (nameInput && !nameInput.value.trim()) {
                nameInput.value = capitalizeWords(actual);
            }
            checkAllDrugInteractions();
            return;
        }
    }

    // If brand not found in aliases, try to match common medicines
    for (const med of COMMON_MEDICINES) {
        if (brand.includes(med) || med.includes(brand)) {
            moleculeInput.value = capitalizeWords(med);
            if (nameInput && !nameInput.value.trim()) {
                nameInput.value = capitalizeWords(med);
            }
            checkAllDrugInteractions();
            return;
        }
    }

    // No match found
    moleculeInput.value = '';
}

function removeMedicineField(id) {
    const medicineDiv = document.getElementById(`medicine-${id}`);
    if (medicineDiv) {
        medicineDiv.remove();
        checkAllDrugInteractions();
    }
}

function getAllMedicines() {
    const medicines = [];
    const medicineCards = document.querySelectorAll('.medicine-card');
    console.log("🔍 Found medicine cards:", medicineCards.length);
    
    medicineCards.forEach((card, idx) => {
        const name = card.querySelector('.medicine-name').value.trim();
        const brand = (card.querySelector('.medicine-brand') && card.querySelector('.medicine-brand').value.trim()) || '';
        const molecule = (card.querySelector('.medicine-molecule') && card.querySelector('.medicine-molecule').value.trim()) || '';
        const diagnosis = (card.querySelector('.medicine-diagnosis') && card.querySelector('.medicine-diagnosis').value.trim()) || '';
        const dosage = card.querySelector('.medicine-dosage').value.trim();
        const route = card.querySelector('.medicine-route').value;
        const frequency = card.querySelector('.medicine-frequency').value.trim();
        const duration = card.querySelector('.medicine-duration').value.trim();
        const timing = card.querySelector('.medicine-timing').value;
        
        const finalName = name || molecule || brand;
        console.log(`💊 Card ${idx + 1}: name="${name}", brand="${brand}", molecule="${molecule}", dosage="${dosage}"`);
        
        if (finalName) {
            medicines.push({ name: finalName, brand, molecule, diagnosis, dosage, route, frequency, duration, timing });
        }
    });
    
    console.log("✅ Total medicines to save:", medicines.length, medicines);
    return medicines;
}

// ============================================
// SPEECH-TO-TEXT FUNCTIONS
// ============================================

let isListening = false;
let speechBuffer = '';

function toggleVoiceInput() {
    if (!recognitionInstance) {
        alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
        return;
    }
    
    const voiceBtn = document.getElementById('voiceBtn');
    const voiceStatus = document.getElementById('voiceStatus');
    
    if (isListening) {
        recognitionInstance.stop();
        isListening = false;
        voiceBtn.textContent = '🎤 Start Voice Input';
        voiceBtn.classList.remove('listening');
        voiceStatus.textContent = '';
        speechBuffer = '';
    } else {
        recognitionInstance.start();
        isListening = true;
        voiceBtn.textContent = '🛑 Stop Voice Input';
        voiceBtn.classList.add('listening');
        voiceStatus.textContent = 'Listening... Say medicine details';
        speechBuffer = '';
    }
}

function extractMedicineNameFromText(text) {
    // Improved matching: check brand aliases first, then medicines sorted by length
    const lowerText = text.toLowerCase();

    // 1) Match known brand aliases directly
    for (const [alias, actual] of Object.entries(DRUG_ALIASES)) {
        if (lowerText.includes(alias)) {
            return capitalizeWords(actual);
        }
    }

    // 2) Try to match common medicines preferring longer names first
    const meds = [...COMMON_MEDICINES].sort((a, b) => b.length - a.length);
    for (const med of meds) {
        // build safe regex for word-boundary match
        const safe = med.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp('\\b' + safe + '\\b', 'i');
        if (re.test(text) || lowerText.includes(med)) {
            return capitalizeWords(med);
        }
    }

    // 3) Try looser partial matches for longer tokens
    const words = lowerText.split(/\s+/).map(w => w.replace(/[^a-z0-9-]/g, ''));
    for (const w of words) {
        if (w.length < 3) continue;
        for (const med of meds) {
            if (med.includes(w) || w.includes(med) || med.startsWith(w) || w.startsWith(med)) {
                return capitalizeWords(med);
            }
        }
    }

    return ''; // No match found
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeWords(str) {
    return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

function parsePrescriptionFromSpeech(text) {
    // Enhanced parsing logic to extract all prescription details
    const parsed = {
        name: '',
        brand: '',
        molecule: '',
        dosage: '',
        frequency: '',
        duration: '',
        timing: '',
        diagnosis: ''
    };
    
    const lowerText = text.toLowerCase();
    
    // First, extract the medicine name from known medicines list
    parsed.name = extractMedicineNameFromText(text);

    // Detect brand aliases mentioned in the speech and map to generic molecule
    for (const [alias, actualDrug] of Object.entries(DRUG_ALIASES)) {
        if (lowerText.includes(alias)) {
            parsed.brand = capitalizeWords(alias);
            parsed.name = capitalizeWords(actualDrug);
            parsed.molecule = capitalizeWords(actualDrug);
            break;
        }
    }

    // If we already found a generic name, set molecule accordingly
    if (!parsed.molecule && parsed.name) {
        parsed.molecule = parsed.name;
    }
    
    // If no medicine found, don't proceed
    if (!parsed.name) {
        return parsed;
    }
    
    // Extract diagnosis if mentioned in context (e.g., "for fever", "for cough")
    const diagnosisMatch = text.match(/\b(?:for|to treat|to manage|condition|diagnosis|diagnosed with)\s+([a-z\s]+?)(?:\.|\s+(?:tablet|capsule|medicine|dose|mg|take|twice|thrice|daily))/i);
    if (diagnosisMatch) {
        parsed.diagnosis = capitalizeFirstLetter(diagnosisMatch[1].trim());
    }
    
    // Extract dosage - look for numbers followed by units
    const dosageMatch = text.match(/\b(\d+\.?\d*)\s?(mg|g|ml|mcg|units?|tablets?|capsules?|drops?|iu|micrograms?|milligrams?|grams?|milliliters?)\b/i);
    if (dosageMatch) {
        const number = dosageMatch[1];
        const unit = dosageMatch[2].toLowerCase();
        
        // Normalize unit names
        if (unit.startsWith('tablet')) parsed.dosage = `${number}mg`;
        else if (unit.startsWith('capsule')) parsed.dosage = `${number}mg`;
        else if (unit === 'mg' || unit === 'milligrams') parsed.dosage = `${number}mg`;
        else if (unit === 'g' || unit === 'grams') parsed.dosage = `${number}g`;
        else if (unit === 'ml' || unit === 'milliliters') parsed.dosage = `${number}ml`;
        else if (unit === 'mcg' || unit === 'micrograms') parsed.dosage = `${number}mcg`;
        else parsed.dosage = dosageMatch[0];
    }
    
    // Extract frequency (comprehensive patterns)
    const frequencyPatterns = [
        { pattern: /\b(once|one time)\s+(daily|a day|per day)\b/i, value: 'Once daily' },
        { pattern: /\b(twice|two times?)\s+(daily|a day|per day)\b/i, value: 'Twice daily' },
        { pattern: /\b(thrice|three times?)\s+(daily|a day|per day)\b/i, value: 'Three times daily' },
        { pattern: /\b(four times?)\s+(daily|a day|per day)\b/i, value: 'Four times daily' },
        { pattern: /\b(every|each)\s+(\d+)\s+(hours?|hrs?)\b/i, value: (m) => `Every ${m[2]} hours` },
        { pattern: /\b(once daily|OD)\b/i, value: 'Once daily' },
        { pattern: /\b(twice daily|BD|BID)\b/i, value: 'Twice daily' },
        { pattern: /\b(three times daily|TDS|TID)\b/i, value: 'Three times daily' },
        { pattern: /\b(four times daily|QID)\b/i, value: 'Four times daily' },
        { pattern: /\b(as needed|SOS|when required|if needed|PRN)\b/i, value: 'As needed' },
        { pattern: /\b(at night|night time|bedtime|HS)\b/i, value: 'Once at night' }
    ];
    
    for (const { pattern, value } of frequencyPatterns) {
        const match = text.match(pattern);
        if (match) {
            parsed.frequency = typeof value === 'function' ? value(match) : value;
            break;
        }
    }
    
    // Extract timing (meal-related)
    const timingPatterns = [
        { pattern: /\b(before)\s+(meals?|food|eating)\b/i, value: 'Before food' },
        { pattern: /\b(after)\s+(meals?|food|eating)\b/i, value: 'After food' },
        { pattern: /\b(with)\s+(meals?|food|eating)\b/i, value: 'With food' },
        { pattern: /\b(at bedtime|before bed|at night|bedtime|HS)\b/i, value: 'At bedtime' },
        { pattern: /\b(empty stomach|on empty stomach)\b/i, value: 'Empty stomach' },
        { pattern: /\b(as needed|when needed|SOS)\b/i, value: 'As needed' }
    ];
    
    for (const { pattern, value } of timingPatterns) {
        const match = text.match(pattern);
        if (match) {
            parsed.timing = value;
            break;
        }
    }
    
    // Extract duration
    const durationMatch = text.match(/\b(for|duration|continue for|take for)\s+(\d+)\s+(days?|weeks?|months?)\b/i);
    if (durationMatch) {
        const number = durationMatch[2];
        const unit = durationMatch[3].toLowerCase();
        
        if (unit.startsWith('day')) parsed.duration = `${number} days`;
        else if (unit.startsWith('week')) parsed.duration = `${number} weeks`;
        else if (unit.startsWith('month')) parsed.duration = `${number} months`;
    }
    
    return parsed;
}

function extractDiagnosisFromSpeech(text) {
    // Extract diagnosis with better pattern matching
    const diagnosisPatterns = [
        /\b(?:diagnosis|diagnosed with|diagnosed as|condition is|suffering from)\s+(?:is\s+)?(.+?)(?:\.|prescribe|give|medicine|tablet|take|continue)/i,
        /\b(?:patient has|presents with)\s+(.+?)(?:\.|prescribe|give|medicine)/i
    ];
    
    for (const pattern of diagnosisPatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            let diagnosis = match[1].trim();
            // Clean up common trailing words
            diagnosis = diagnosis.replace(/\b(and|with|plus|also)\s*$/i, '').trim();
            if (diagnosis.length > 3) {
                return capitalizeFirstLetter(diagnosis);
            }
        }
    }
    
    return '';
}

function extractSymptomsFromSpeech(text) {
    // Extract symptoms/complaints with better accuracy
    const symptomPatterns = [
        /\b(?:complains of|complaints?|symptoms?|presenting with|patient has|suffering from)\s+(.+?)(?:\.|diagnosis|prescribe|give|for|since|from)/i,
        /\b(?:fever|cough|cold|pain|headache|vomiting|diarrhea|nausea|weakness|dizziness)[\w\s,]+?(?:\.|diagnosis|prescribe|for|since)/i
    ];
    
    for (const pattern of symptomPatterns) {
        const match = text.match(pattern);
        if (match) {
            let symptoms = match[1] ? match[1].trim() : match[0].trim();
            // Clean up
            symptoms = symptoms.replace(/\b(and|with|for|since)\s*$/i, '').trim();
            if (symptoms.length > 3) {
                return capitalizeFirstLetter(symptoms);
            }
        }
    }
    
    return '';
}

function handleSpeechResult(event) {
    let finalTranscript = '';
    let interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
        } else {
            interimTranscript += transcript;
        }
    }
    
    if (finalTranscript) {
        console.log("FINAL:", finalTranscript);
        console.log("BUFFER:", speechBuffer);
        speechBuffer += finalTranscript;
        const lowerBuffer = speechBuffer.toLowerCase();
        // If doctor says 'stop' or 'stop recording', process text before stop and then halt recognition
        const stopMatch = lowerBuffer.match(/\b(stop recording|stop)\b/i);
        if (stopMatch) {
            const idx = lowerBuffer.indexOf(stopMatch[0]);
            const before = speechBuffer.slice(0, idx).trim();
            if (before.length > 0) {
                // process segments in 'before'
                const separatorRegex = /\b(next medicine|next prescribe|another medicine|also give|then|next)\b/i;
                const segments = before.split(separatorRegex).map(s => s.trim()).filter(s => s.length > 0 && !s.match(separatorRegex));
                for (const seg of segments) {
                    // use same processing as earlier: parse and fill
                    
                    const parsed = parsePrescriptionFromSpeech(seg);

                    if (!parsed.name && !parsed.molecule && !parsed.brand) continue;

                    let medicineCards = document.querySelectorAll('.medicine-card');
                    let targetCard = null;
                    for (const card of medicineCards) {
                        if (!card.querySelector('.medicine-name').value.trim()) { targetCard = card; break; }
                    }
                    if (!targetCard) { addMedicineField(); targetCard = document.querySelector('.medicine-card:last-child'); }

                    if (parsed.brand) {
                        const brandInput = targetCard.querySelector('.medicine-brand');
                        if (brandInput) { brandInput.value = parsed.brand; try { brandChanged(brandInput); } catch (e) {} }
                    }
                    if (parsed.molecule) {
                        const molInput = targetCard.querySelector('.medicine-molecule'); if (molInput) molInput.value = capitalizeWords(parsed.molecule);
                    }
                    if (parsed.diagnosis) {
                        const diagInput = targetCard.querySelector('.medicine-diagnosis'); if (diagInput) diagInput.value = capitalizeFirstLetter(parsed.diagnosis);
                    }
                    const nameInput = targetCard.querySelector('.medicine-name'); if (nameInput) nameInput.value = parsed.name ? capitalizeWords(parsed.name) : (parsed.molecule ? capitalizeWords(parsed.molecule) : (parsed.brand || nameInput.value));
                    if (parsed.dosage && parsed.dosage !== 'Not specified') targetCard.querySelector('.medicine-dosage').value = parsed.dosage;
                    if (parsed.frequency && parsed.frequency !== 'Not specified') targetCard.querySelector('.medicine-frequency').value = parsed.frequency;
                    if (parsed.duration && parsed.duration !== 'Not specified') targetCard.querySelector('.medicine-duration').value = parsed.duration;
                    if (parsed.instructions && parsed.instructions !== 'None') targetCard.querySelector('.medicine-timing').value = parsed.instructions;
                    checkAllDrugInteractions();
                }
            }

            // Stop recognition
            try { recognitionInstance.stop(); } catch (e) {}
            isListening = false;
            const voiceBtn = document.getElementById('voiceBtn');
            const voiceStatus = document.getElementById('voiceStatus');
            if (voiceBtn) { voiceBtn.textContent = '🎤 Start Voice Input'; voiceBtn.classList.remove('listening'); }
            if (voiceStatus) voiceStatus.textContent = '';
            speechBuffer = '';
            return;
        }
        
        // Extract and fill symptoms/complaints (only once)
        const symptomsField = document.getElementById('chiefComplaints');
        if (!symptomsField.value.trim() && 
            (lowerBuffer.includes('complain') || lowerBuffer.includes('symptom') || 
             lowerBuffer.includes('patient') || lowerBuffer.includes('fever') || 
             lowerBuffer.includes('pain') || lowerBuffer.includes('cough'))) {
            const symptoms = extractSymptomsFromSpeech(speechBuffer);
            if (symptoms) {
                symptomsField.value = symptoms;
            }
        }
        
        // Extract and fill diagnosis (only once) — only when doctor explicitly states diagnosis
        const diagnosisField = document.getElementById('diagnosis');
        if (!diagnosisField.value.trim()) {
            // detect 'diagnosis' keyword position
            const diagMatch = lowerBuffer.match(/\b(diagnosis|diagnosed|diagnosis is)\b/i);
            if (diagMatch) {
                const diagIndex = lowerBuffer.indexOf(diagMatch[0]);

                // find earliest prescription marker or medicine mention index
                const prescriptionMarkers = ['prescribe','give','take','tablet','capsule','start','continue','next'];
                let earliestPresc = lowerBuffer.length;
                for (const pm of prescriptionMarkers) {
                    const idx = lowerBuffer.indexOf(pm);
                    if (idx !== -1 && idx < earliestPresc) earliestPresc = idx;
                }

                let earliestMed = lowerBuffer.length;
                for (const med of COMMON_MEDICINES) {
                    const idx = lowerBuffer.indexOf(med);
                    if (idx !== -1 && idx < earliestMed) earliestMed = idx;
                }

                // Only extract diagnosis if 'diagnosis' appears before any medicine or prescription words
                if (diagIndex !== -1 && diagIndex < earliestPresc && diagIndex < earliestMed) {
                    const diagnosis = extractDiagnosisFromSpeech(speechBuffer);
                    if (diagnosis) diagnosisField.value = diagnosis;
                }
            }
        }
        
        // Check if we should process a medicine entry
        // Look for medicine names from our list or prescription keywords with dosage info
        const hasMedicineKeyword = COMMON_MEDICINES.some(med => lowerBuffer.includes(med));
        const hasPrescriptionKeyword = ['prescribe', 'give', 'take', 'tablet', 'capsule'].some(kw => lowerBuffer.includes(kw));
        const hasDosageInfo = lowerBuffer.match(/\d+\s?(mg|ml|g|mcg)/i);

        // Relaxed condition: process when we hear a medicine name with dosage or prescription keywords
        
        const shouldProcessMedicine =
          hasMedicineKeyword ||
          hasDosageInfo ||
          lowerBuffer.match(/\b(next medicine|next prescribe|another medicine|also give|then|next)\b/i);


        if (shouldProcessMedicine) {
            // Process potentially multiple medicine segments separated by keywords like "next medicine"
            const separatorRegex = /\b(next medicine|next prescribe|another medicine|also give|then|next)\b/i;
            let buffer = speechBuffer.trim();

            const processSegment = (segment) => {
              if (!segment || segment.trim().length === 0) return;

              const parsed = parsePrescriptionFromSpeech(segment);

              // ✅ If nothing useful extracted, skip
              if (!parsed.name && !parsed.molecule && !parsed.brand) return;

              // Find empty medicine card or create one
              let medicineCards = document.querySelectorAll('.medicine-card');
              let targetCard = null;

              for (const card of medicineCards) {
                if (!card.querySelector('.medicine-name').value.trim()) {
                  targetCard = card;
                  break;
                }
              }

              if (!targetCard) {
                addMedicineField();
                targetCard = document.querySelector('.medicine-card:last-child');
              }

              // ✅ Brand
              if (parsed.brand) {
                const brandInput = targetCard.querySelector('.medicine-brand');
                if (brandInput) {
                  brandInput.value = parsed.brand;
                  try { brandChanged(brandInput); } catch (e) {}
                }
              }

              // ✅ Molecule
              if (parsed.molecule) {
                const molInput = targetCard.querySelector('.medicine-molecule');
                if (molInput) molInput.value = capitalizeWords(parsed.molecule);
              }

              // ✅ Diagnosis per medicine
              if (parsed.diagnosis) {
                const diagInput = targetCard.querySelector('.medicine-diagnosis');
                if (diagInput) diagInput.value = capitalizeFirstLetter(parsed.diagnosis);
              }

              // ✅ Medicine Name
              const nameInput = targetCard.querySelector('.medicine-name');
              if (nameInput) {
                nameInput.value = parsed.name
                  ? capitalizeWords(parsed.name)
                  : (parsed.molecule ? capitalizeWords(parsed.molecule) : (parsed.brand || nameInput.value));
              }

              // ✅ Dosage
              if (parsed.dosage) targetCard.querySelector('.medicine-dosage').value = parsed.dosage;

              // ✅ Frequency
              if (parsed.frequency) targetCard.querySelector('.medicine-frequency').value = parsed.frequency;

              // ✅ Duration
              if (parsed.duration) targetCard.querySelector('.medicine-duration').value = parsed.duration;

              // ✅ Timing
              if (parsed.timing) targetCard.querySelector('.medicine-timing').value = parsed.timing;

              checkAllDrugInteractions();
            };

            // Split buffer into segments using separator words, process each
            const segments = buffer.split(separatorRegex).map(s => s.trim()).filter(s => s.length > 0 && !s.match(separatorRegex));
            for (const seg of segments) {
                processSegment(seg);
            }

            // Clear speech buffer after processing
            speechBuffer = '';
        }
        // Also try to extract instructions from speech buffer (dietary, general, follow-up)
        try {
            const instr = extractInstructionsFromSpeech(lowerBuffer);
            if (instr.dietary) document.getElementById('dietaryAdvice').value = instr.dietary;
            if (instr.general) document.getElementById('generalInstructions').value = instr.general;
            if (instr.followUp) document.getElementById('followUp').value = instr.followUp;
        } catch (e) {
            // silent
        }
    }
    
    const voiceStatus = document.getElementById('voiceStatus');
    voiceStatus.textContent = interimTranscript ? `"${interimTranscript}"` : 'Listening...';
}

function handleSpeechError(event) {
    console.error('Speech recognition error:', event.error);
    const voiceStatus = document.getElementById('voiceStatus');
    voiceStatus.textContent = `Error: ${event.error}`;
}

function handleSpeechEnd() {
    if (isListening) {
        // Auto-restart if user didn't manually stop
        recognitionInstance.start();
    }
}

function extractInstructionsFromSpeech(text) {
    // Return object { dietary, general, followUp } extracted from text
    const result = { dietary: '', general: '', followUp: '' };
    if (!text || text.length < 3) return result;

    // Normalize separators - split sentences
    const sentences = text.split(/[\.\n\r]/).map(s => s.trim()).filter(s => s.length > 0);

    for (const s of sentences) {
        const lower = s.toLowerCase();
        if (lower.includes('diet') || lower.includes('dietary') || lower.includes('food')) {
            // take the sentence as dietary advice
            if (!result.dietary) result.dietary = capitalizeFirstLetter(s.replace(/^(dietary advice[:\-\s]*)/i, '').trim());
            continue;
        }

        if (lower.includes('instruction') || lower.includes('advise') || lower.includes('advice') || lower.includes('rest') || lower.includes('follow-up instructions')) {
            if (!result.general) result.general = capitalizeFirstLetter(s.replace(/^(instructions[:\-\s]*)/i, '').trim());
            continue;
        }

        if (lower.includes('follow up') || lower.includes('follow-up') || lower.includes('followup') || lower.includes('follow up after')) {
            if (!result.followUp) result.followUp = capitalizeFirstLetter(s);
            continue;
        }
    }

    return result;
}

// -----------------------------
// Simple prescription parser (adapted from provided Python code)
// -----------------------------
function extractBrandSimple(text) {
    const lower = text.toLowerCase();
    for (const brand of Object.keys(BRAND_TO_GENERIC)) {
        if (lower.includes(brand)) return brand.charAt(0).toUpperCase() + brand.slice(1);
    }
    return 'Not specified';
}

function extractGenericSimple(brand, text) {
    if (brand && brand !== 'Not specified') {
        const g = BRAND_TO_GENERIC[brand.toLowerCase()];
        return g || 'Unknown';
    }
    const lower = text.toLowerCase();
    const medicinesGeneric = new Set(
        Object.values(BRAND_TO_GENERIC)
            .flatMap(v => v.split('+').map(x => x.trim().toLowerCase()))
    );
    
    // Try to find a generic medicine in the text
    for (const med of COMMON_MEDICINES) {
        if (lower.includes(med.toLowerCase())) {
            return med;
        }
    }
    
    return 'Unknown';
}

function extractDosageSimple(text) {
    const m = text.match(/(\d+)\s*(mg|ml)/i);
    return m ? m[0] : 'Not specified';
}

function extractFrequencySimple(text) {
    const lower = text.toLowerCase();
    if (lower.includes('once')) return 'Once daily';
    if (lower.includes('twice')) return 'Twice daily';
    if (lower.includes('thrice') || lower.includes('three times')) return 'Three times daily';
    if (lower.includes('morning and night') || lower.includes('morning and night')) return 'Morning and Night';
    return 'Not specified';
}

function extractDurationSimple(text) {
    const m = text.match(/(\d+)\s*(day|days|week|weeks)/i);
    return m ? m[0] : 'Not specified';
}

function extractInstructionSimple(text) {
    const lower = text.toLowerCase();
    if (lower.includes('after food')) return 'After food';
    if (lower.includes('before food')) return 'Before food';
    if (lower.includes('at night') || lower.includes('bedtime')) return 'At night';
    return 'None';
}

function extractDiagnosisSimple(text) {
    // grab words after 'diagnosis' until hitting a medicine/number token
    const lower = text.toLowerCase();
    if (!lower.includes('diagnosis')) return 'Not specified';
    const tokens = lower.split(/\s+/);
    
    const medicinesGeneric = new Set(
        Object.values(BRAND_TO_GENERIC)
            .flatMap(v => v.split('+').map(x => x.trim().toLowerCase()))
    );
    
    const stopWords = new Set([...Object.keys(BRAND_TO_GENERIC), ...medicinesGeneric, 'mg','ml','tablet','capsule']);
    const out = [];
    let capture = false;
    for (const token of tokens) {
        if (token === 'diagnosis') { capture = true; continue; }
        if (capture) {
            if (stopWords.has(token) || /^\d+/.test(token)) break;
            out.push(token);
        }
    }
    return out.length ? out.join(' ') : 'Not specified';
}

function parsePrescriptionSimple(text) {
    const brand = extractBrandSimple(text);
    const generic = extractGenericSimple(brand, text);
    return {
        diagnosis: extractDiagnosisSimple(text),
        brand: brand,
        generic: generic,
        dosage: extractDosageSimple(text),
        frequency: extractFrequencySimple(text),
        duration: extractDurationSimple(text),
        instructions: extractInstructionSimple(text)
    };
}

// ============================================
// DRUG INTERACTION CHECKING
// ============================================
function normalizeDrugNames(inputName) {
  const s = (inputName || "").toLowerCase().trim();

  // 1) Brand → generic (like combiflam -> ibuprofen + paracetamol)
  for (const brand of Object.keys(BRAND_TO_GENERIC)) {
    if (s.includes(brand)) {
      return BRAND_TO_GENERIC[brand].split("+").map(x => x.trim());
    }
  }

  // 2) Aliases → generic (like advil -> ibuprofen)
  for (const [alias, gen] of Object.entries(DRUG_ALIASES)) {
    if (s.includes(alias)) return [gen];
  }

  // 3) Generic already present
  const found = [];
  for (const med of COMMON_MEDICINES) {
    if (s.includes(med)) found.push(med);
  }

  return found.length ? found : [s];
}

async function checkAllDrugInteractions() {
  if (!currentPatientId) return;

  try {
    const patientData = await dbGetPatient(currentPatientId);
    if (!patientData) return;

    patientData.conditions = await dbGetConditions(currentPatientId);

    if (!patientData.conditions || patientData.conditions.length === 0) {
      document.getElementById("warningSection").classList.add("hidden");
      return;
    }

    const warnings = [];
    const medicines = getAllMedicines();

    medicines.forEach(medicine => {
      const normalizedDrugNames = normalizeDrugNames(medicine.name);


      for (const drugName of normalizedDrugNames) {
  for (const [dbDrug, drugInfo] of Object.entries(DRUG_DATABASE)) {
    if (drugName.includes(dbDrug)) {
      for (const condition of patientData.conditions) {
        if (drugInfo.contraindications.includes(condition)) {
          warnings.push({
            drug: medicine.name,
            condition,
            message: drugInfo.warnings[condition],
            source: drugInfo.source
          });
        }
      }
    }
  }
}


      for (const [alias, actualDrug] of Object.entries(DRUG_ALIASES)) {
        if (drugName.includes(alias)) {
          const drugInfo = DRUG_DATABASE[actualDrug];
          if (drugInfo) {
            for (const condition of patientData.conditions) {
              if (drugInfo.contraindications.includes(condition)) {
                warnings.push({
                  drug: `${medicine.name} (${actualDrug})`,
                  condition: condition,
                  message: drugInfo.warnings[condition],
                  source: drugInfo.source
                });
              }
            }
          }
        }
      }
    });

    if (warnings.length > 0) displayWarnings(warnings);
    else document.getElementById("warningSection").classList.add("hidden");

  } catch (e) {
    console.error(e);
  }
}
function displayWarnings(warnings) {
    const warningSection = document.getElementById('warningSection');
    const warningMessages = document.getElementById('warningMessages');
    
    const conditionLabels = {
        'hypertension': 'Hypertension',
        'diabetes': 'Diabetes',
        'pregnancy': 'Pregnancy',
        'renal_impairment': 'Renal Impairment',
        'liver_disease': 'Liver Disease',
        'asthma': 'Asthma'
    };
    
    warningMessages.innerHTML = warnings.map(warning => `
        <div class="warning-item">
            <strong class="drug-name">${warning.drug.toUpperCase()}</strong>
            <p style="margin: var(--spacing-xs) 0;">
                <strong>Patient Condition:</strong> ${conditionLabels[warning.condition]}
            </p>
            <p style="margin: var(--spacing-xs) 0;">
                ${warning.message}
            </p>
            <p class="warning-source">Source: ${warning.source}</p>
        </div>
    `).join('');
    
    warningSection.classList.remove('hidden');
    
    // Reset acknowledgment
    document.getElementById('acknowledgeWarning').checked = false;
    document.getElementById('overrideReason').value = '';
}

// ============================================
// PRESCRIPTION SAVING
// ============================================

async function savePrescription() {
    console.log("💾 savePrescription() called");
    if (!currentPatientId) {
        alert('Please load a patient first');
        return;
    }
    
    const medicines = getAllMedicines();
    console.log("📋 Medicines collected:", medicines);
    
    if (medicines.length === 0) {
        alert('Please add at least one medicine');
        return;
    }
    
    const warningSection = document.getElementById('warningSection');
    const hasWarnings = !warningSection.classList.contains('hidden');
    
    if (hasWarnings) {
        const acknowledged = document.getElementById('acknowledgeWarning').checked;
        if (!acknowledged) {
            alert('Please acknowledge the safety warnings before saving the prescription.');
            return;
        }
    }
    const patientData = await dbGetPatient(currentPatientId);

    const overrideReason = document.getElementById('overrideReason').value.trim();
    
    // Collect all prescription data
    const prescriptionData = {
        // Patient info
        patientName: patientData.name || '',
        patientAge: patientData.age || '',
        patientGender: patientData.gender || '',
        
        // Clinical data
        chiefComplaints: document.getElementById('chiefComplaints').value.trim(),
        diagnosis: document.getElementById('diagnosis').value.trim(),
        bloodPressure: document.getElementById('bloodPressure').value.trim(),
        pulse: document.getElementById('pulse').value.trim(),
        temperature: document.getElementById('temperature').value.trim(),
        weight: document.getElementById('weight').value.trim(),
        spo2: document.getElementById('spo2').value.trim(),
        examination: document.getElementById('examination').value.trim(),
        
        // Medicines
        medicines: medicines,
        
        // Instructions
        dietaryAdvice: document.getElementById('dietaryAdvice').value.trim(),
        generalInstructions: document.getElementById('generalInstructions').value.trim(),
        followUp: document.getElementById('followUp').value.trim(),
        
        // Metadata
        doctorId: getCurrentUserId(),
        date: new Date().toISOString(),
        warnings: hasWarnings,
        doctorNotes: overrideReason || (hasWarnings ? 'Warnings acknowledged by prescribing physician.' : '')
    };
    
    // Format for display
    let prescriptionContent = '';
    
    if (prescriptionData.patientName) {
        prescriptionContent += `Patient: ${prescriptionData.patientName}\n`;
        if (prescriptionData.patientAge) prescriptionContent += `Age: ${prescriptionData.patientAge} years | `;
        if (prescriptionData.patientGender) prescriptionContent += `Gender: ${prescriptionData.patientGender}\n`;
        prescriptionContent += '\n';
    }
    
    // Note: clinical assessment fields are intentionally not included here.
    // Per-medicine associated diagnosis will be displayed with each medicine below.
    
    prescriptionContent += '℞ Prescription:\n';
    prescriptionContent += '─'.repeat(50) + '\n';
    
    medicines.forEach((med, index) => {
        prescriptionContent += `${index + 1}. ${med.name}`;
        if (med.diagnosis) prescriptionContent += `  (Diagnosis: ${med.diagnosis})`;
        if (med.dosage) prescriptionContent += ` - ${med.dosage}`;
        if (med.route && med.route !== 'Oral') prescriptionContent += ` (${med.route})`;
        prescriptionContent += '\n';
        if (med.frequency) prescriptionContent += `   ${med.frequency}`;
        if (med.timing) prescriptionContent += ` - ${med.timing}`;
        if (med.duration) prescriptionContent += ` - ${med.duration}`;
        prescriptionContent += '\n\n';
    });
    
    if (prescriptionData.dietaryAdvice || prescriptionData.generalInstructions) {
        prescriptionContent += 'Instructions:\n';
        if (prescriptionData.dietaryAdvice) prescriptionContent += `- ${prescriptionData.dietaryAdvice}\n`;
        if (prescriptionData.generalInstructions) prescriptionContent += `- ${prescriptionData.generalInstructions}\n`;
    }
    
    if (prescriptionData.followUp) {
        prescriptionContent += `\nFollow-up: ${prescriptionData.followUp}\n`;
    }
    
    prescriptionData.content = prescriptionContent;
    
    try {
  console.log("🔄 Saving prescription to Supabase...", {
    patientId: currentPatientId,
    medicineCount: prescriptionData.medicines.length,
    doctorId: getCurrentUserId()
  });

  // 1) Insert prescription
  const { data: presc, error } = await supabaseClient
    .from("prescriptions")
    .insert([{
      patient_id: currentPatientId.toUpperCase(),
      doctor_id: getCurrentUserId(),
      content: prescriptionData.content,
      warnings: prescriptionData.warnings,
      doctor_notes: prescriptionData.doctorNotes
    }])
    .select()
    .single();

  if (error) {
    console.error("❌ Prescription insert error:", error);
    throw error;
  }

  console.log("✅ Prescription saved:", presc.id);

  // 2) Insert medicines
  const rows = prescriptionData.medicines.map(m => ({
    prescription_id: presc.id,
    name: m.name,
    brand: m.brand,
    molecule: m.molecule,
    diagnosis: m.diagnosis,
    dosage: m.dosage,
    route: m.route,
    frequency: m.frequency,
    duration: m.duration,
    timing: m.timing
  }));

  console.log("💊 Medicine rows to insert:", rows);

  if (rows.length > 0) {
    const { error: medErr } = await supabaseClient
      .from("prescription_medicines")
      .insert(rows);

    if (medErr) {
      console.error("❌ Medicines insert error:", medErr);
      throw medErr;
    }
    console.log("✅ Medicines saved successfully");
  }

  // success UI
  console.log("✨ Prescription saved successfully!");
  document.getElementById("successMessage").classList.remove("hidden");

  setTimeout(() => {
    clearPrescription();
    document.getElementById("successMessage").classList.add("hidden");
  }, 3000);

} catch (e) {
  console.error("❌ SAVE FAILED:", e);
  console.error("Error details:", {
    message: e.message,
    code: e.code,
    status: e.status
  });
  alert("Failed to save prescription: " + e.message);
}

    
    
}

function clearPrescription() {
    // Clear all fields
    document.getElementById('chiefComplaints').value = '';
    document.getElementById('diagnosis').value = '';
    document.getElementById('bloodPressure').value = '';
    document.getElementById('pulse').value = '';
    document.getElementById('temperature').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('spo2').value = '';
    document.getElementById('examination').value = '';
    
    document.getElementById('medicinesList').innerHTML = '';
    medicineCounter = 0;
    addMedicineField();
    
    document.getElementById('dietaryAdvice').value = '';
    document.getElementById('generalInstructions').value = '';
    document.getElementById('followUp').value = '';
    
    document.getElementById('warningSection').classList.add('hidden');
    document.getElementById('acknowledgeWarning').checked = false;
    document.getElementById('overrideReason').value = '';
    
    speechBuffer = '';
    
    // Stop voice input if active
    if (isListening) {
        toggleVoiceInput();
    }
}
