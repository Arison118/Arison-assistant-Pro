// ==========================================================
// ARISON ASSISTANT - MULTI-MODEL FALLBACK & RAISONNEMENT ÉTENDU 24/7
// (100% Force Green Neon Italic Bold Styling for A), B), C))
// ==========================================================

const GEMINI_API_KEY = "AQ.Ab8RN6KNGVj0o20hzmkuy58zdB6WkM38x-gk6AG5yeEB8azqgQ"; // Apetraka eto ny API Key-nao

const GEMINI_MODELS = [
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash",
    "gemini-3.1-pro",
    "gemini-2.5-pro"
];

document.addEventListener("DOMContentLoaded", function () {
    console.log("Arison Assistant Raisonnement étendu sy Fiteny Rehetra vonona tanteraka!");
    createFullScreenAssistantUI();
});

function createFullScreenAssistantUI() {
    if (document.getElementById('arisonChatModal')) return;

    const chatHTML = `
    <div id="arisonChatModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:#0b0f19; z-index:999999; flex-direction:column; font-family:sans-serif;">
        <!-- Header Matihanina -->
        <div style="padding:12px 15px; background:#0f172a; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0,242,254,0.2);">
            <div style="display:flex; align-items:center; gap:8px;">
                <i class="fa-solid fa-robot" style="color:#00f2fe; font-size:1.1rem;"></i><b style="color:#fff; font-size:1rem;">Arison Assistant Pro</b>
            </div>
            <button onclick="closeArisonAssistant()" style="background:transparent; border:none; color:#fff; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Messages Container -->
        <div id="arisonChatMessages" style="flex:1; padding:15px; overflow-y:auto; display:flex; flex-direction:column; gap:12px;">
            <div style="background:#1e293b; padding:12px; border-radius:12px; align-self:flex-start; max-width:90%; line-height:1.6; color:#fff; font-size:13px; border:1px solid rgba(0,242,254,0.2);">
                Miarahaba tompoko! Izaho no Arison Assistant, vonona hanampy sy hanoro anao amin'ny varotra sy ny fiofanana rehetra amin'ny fiteny rehetra manerana izao tontolo izao.
            </div>
        </div>

        <!-- Bokotra fohy (Action Buttons kely eo ambany) -->
        <div style="display: flex; gap: 6px; padding: 6px 12px; background: #0f172a; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.05);">
          <button onclick="window.location.href='tel:+261383374408'" style="background: rgba(0,242,254,0.1); color: #00f2fe; border: 1px solid #00f2fe; border-radius: 12px; padding: 3px 8px; font-size: 10px; cursor: pointer;">📞 Antsoy</button>
          <button onclick="shareArisonBoutique()" style="background: rgba(0,242,254,0.1); color: #00f2fe; border: 1px solid #00f2fe; border-radius: 12px; padding: 3px 8px; font-size: 10px; cursor: pointer;">🔗 Share</button>
          <button onclick="resetArisonChat()" style="background: rgba(0,242,254,0.1); color: #00f2fe; border: 1px solid #00f2fe; border-radius: 12px; padding: 3px 8px; font-size: 10px; cursor: pointer;">🔄 Salutation</button>
        </div>

        <!-- Bar d'écriture ambany -->
        <div style="display: flex; flex-direction: column; background: #0f172a; border-top: 1px solid rgba(255,255,255,0.1); padding: 8px 12px; position: relative; z-index: 10;">
          
          <!-- Faritra hisehoan'ny Aperçu ny sary mialoha ny fandefasana -->
          <div id="arisonImagePreviewContainer" style="display: none; align-items: center; margin-bottom: 8px; padding: 4px; background: rgba(0,242,254,0.05); border-radius: 8px; width: fit-content; border: 1px solid rgba(0,242,254,0.2);">
            <div style="position: relative; display: flex; align-items: center; gap: 8px;">
              <img id="arisonSelectedImagePreview" src="" style="height: 40px; width: 40px; object-fit: cover; border-radius: 6px; border: 1px solid #00f2fe;">
              <span style="color: #00f2fe; font-size: 11px;">Vonona alefa ny sary</span>
              <button type="button" onclick="clearArisonSelectedImage()" style="background: #ef4444; color: white; border: none; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-left: 4px;">✕</button>
            </div>
          </div>

          <!-- Bar lehibe misy ny Bokotra [+] sy ny Input ary ny Bokotra fandefasana -->
          <div style="display: flex; align-items: center; width: 100%;">
            <label for="arisonImageInput" style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: rgba(0,242,254,0.15); border: 1px solid #00f2fe; border-radius: 50%; color: #00f2fe; font-size: 18px; cursor: pointer; margin-right: 10px; flex-shrink: 0;"><i class="fa-solid fa-plus"></i></label>
            <input type="file" id="arisonImageInput" accept="image/*" style="display: none;" onchange="previewArisonImage(this)">
            
            <input type="text" id="arisonUserInput" placeholder="Soraty eto ny fanontanianao na amin'inona na amin'inona fiteny..." style="flex: 1; background: transparent; border: none; color: white; outline: none; font-size: 14px;" onkeypress="handleArisonKeyPress(event)">
            
            <button type="button" id="arisonSendBtn" onclick="sendGeminiMessage()" style="background: #2563eb; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; margin-left: 8px; flex-shrink: 0; box-shadow: 0 2px 6px rgba(37,99,235,0.4);"><i class="fa-solid fa-arrow-up" style="color: #fff; font-size: 14px;"></i></button>
          </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);
}

window.openArisonAssistant = function() {
    const modal = document.getElementById('arisonChatModal');
    if (modal) { 
        modal.style.display = 'flex'; 
        document.body.style.overflow = 'hidden'; 
    }
};

window.closeArisonAssistant = function() {
    const modal = document.getElementById('arisonChatModal');
    if (modal) { 
        modal.style.display = 'none'; 
        document.body.style.overflow = 'auto'; 
    }
};

window.shareArisonBoutique = function() {
    if (navigator.share) {
        navigator.share({ title: 'Boutique ARISON', text: 'Tsiditsidio ny Boutique ARISON!', url: window.location.href }).catch(() => {});
    } else {
        alert("Nikaika ny rohy!");
    }
};

window.resetArisonChat = function() {
    document.getElementById('arisonChatMessages').innerHTML = `
        <div style="background:#1e293b; padding:12px; border-radius:12px; align-self:flex-start; max-width:90%; line-height:1.6; color:#fff; font-size:13px; border:1px solid rgba(0,242,254,0.2);">
            Miarahaba indray tompoko! Inona no azontsika resahina androany?
        </div>
    `;
    saveChatHistory();
};

window.handleArisonKeyPress = function(event) {
    if (event.key === 'Enter') {
        sendGeminiMessage();
    }
};

// ==========================================================
// HANDRAISANA SY FAMALIANA AMIN'NY ALALAN'NY RAISONNEMENT ÉTENDU SY FITENY REHETRA
// ==========================================================
window.sendGeminiMessage = async function() {
    const input = document.getElementById('arisonUserInput');
    const container = document.getElementById('arisonChatMessages');
    const imageInput = document.getElementById('arisonImageInput');
    
    if (!input || !container) return;

    let rawText = input.value.trim();
    let base64Image = null;
    let mimeType = null;

    if (imageInput && imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        mimeType = file.type;
        base64Image = await toBase64(file);
    }

    if (!rawText && !base64Image) return;

    const cleanUserText = sanitizeText(rawText);
    
    let userMsgHTML = '<div style="margin: 12px 0; text-align: right;">';
    if (base64Image) {
        userMsgHTML += `<img src="${base64Image}" style="max-width: 180px; border-radius: 10px; border: 2px solid #00f2fe; display: block; margin-left: auto; margin-bottom: 6px;">`;
    }
    if (cleanUserText) {
        userMsgHTML += `<div style="display: inline-block; background: linear-gradient(135deg, #0061ff, #60ef8b); color: #fff; padding: 10px 14px; border-radius: 14px; text-align: left; font-size: 13px;">${cleanUserText}</div>`;
    }
    userMsgHTML += '</div>';

    container.innerHTML += userMsgHTML;
    input.value = '';
    clearArisonSelectedImage();
    
    container.scrollTop = container.scrollHeight;
    saveChatHistory();

    let loadingId = "loading_" + Date.now();
    container.innerHTML += `<div id="${loadingId}" style="color: #00f2fe; padding: 10px; font-style: italic; font-size: 12px;">Mikaroka sy mandinika ny valiny...</div>`;
    container.scrollTop = container.scrollHeight;

    const promptText = `
You are the professional expert AI assistant for Boutique ARISON, specialized in commerce, customer service, and professional training worldwide.
CRITICAL INSTRUCTION ON LANGUAGE: Detect precisely the language used by the user in the prompt below. You MUST reply STRICTLY and ENTIRELY in that exact same language used by the client. Whether it is English, French, Malagasy, Spanish, German, Italian, Chinese, Korean, or any other international language, adapt 100% to the user's language without defaulting to Malagasy unless the user spoke Malagasy.

User's Input / Request: "${cleanUserText || 'Please analyze this image for me'}"

FORMATTING AND STRUCTURE RULES:
- Structure your response professionally with main headings labeled strictly with A), B), C) at the beginning of the line (e.g., A) Title).
- Under each heading, provide sub-points labeled with 1 -, 2 - in purple style.
- Provide comprehensive, clear, and detailed explanations below each sub-point matching the user's inquiry and language.
- Avoid any broken characters or forbidden symbols.
`;

    let data = null;
    let success = false;

    for (let modelName of GEMINI_MODELS) {
        try {
            let contentsArray = [];
            let parts = [{ text: promptText }];
            if (base64Image) {
                const base64Data = base64Image.split(',')[1];
                parts.unshift({
                    inlineData: {
                        mimeType: mimeType || "image/jpeg",
                        data: base64Data
                    }
                });
            }
            contentsArray.push({ parts: parts });

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=` + GEMINI_API_KEY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: contentsArray })
            });

            data = await response.json();
            if (data && data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
                success = true;
                break;
            }
        } catch (err) {
            console.log('Tsy nahomby tamin\'ny maodely, mandeha amin\'ny manaraka...');
        }
    }

    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();

    if (success && data) {
        let rawReply = data.candidates[0].content.parts[0].text;
        let cleanReply = sanitizeText(rawReply);

        let botMsgDiv = document.createElement('div');
        botMsgDiv.style.cssText = "background:transparent; padding:0; align-self:flex-start; max-width:95%; line-height:1.7;";
        container.appendChild(botMsgDiv);

        let formattedHtml = formatAIResponsePerfect(cleanReply);
        let charIndex = 0;
        let finalHtmlContent = formattedHtml;
        botMsgDiv.innerHTML = "";

        function typewriterHtml() {
            if (charIndex < finalHtmlContent.length) {
                botMsgDiv.innerHTML = finalHtmlContent.substring(0, charIndex + 1);
                charIndex++;
                container.scrollTop = container.scrollHeight;
                setTimeout(typewriterHtml, 4);
            }
        }
        typewriterHtml();
        
        saveChatHistory();
    } else {
        container.innerHTML += `<div style="color: #ef4444; padding: 10px 0; font-size: 13px;">Miala tsiny tompoko, nisy olana kely tamin'ny fifandraisana tamin'ny AI. Andramo indray avy eo.</div>`;
        container.scrollTop = container.scrollHeight;
    }
};

function sanitizeText(text) {
    if (!text) return "";
    const forbiddenChars = /[+&#@()/*":;!?%^<>$¥|√•π×¶∆✓\\]/g;
    return text.replace(forbiddenChars, '');
}

// ==========================================================
// FIRAFIRETA PERFECT 100% (A), B), C) = GREEN NEON SERIF ITALIC BOLD + EMOJI)
// ==========================================================
function formatAIResponsePerfect(text) {
    let lines = text.split('\n');
    let htmlResult = '';

    lines.forEach(line => {
        let trimmed = line.trim();
        if (!trimmed) return;

        // Hamantarana sy handokoana tsara ny A), B), C) ho Green Neon Serif Italic Bold miaraka amin'ny Emoji rocket 🚀 eo alohany
        if (/^[A-Z]\)/.test(trimmed) || /^🚀\s*[A-Z]\)/.test(trimmed) || /^[A-Z]\)\s+/.test(trimmed)) {
            // Raha toa ka mbola tsy misy emoji dia asiana ny 🚀 mba hitoviana tanteraka amin'ny fangatahanao
            let cleanHeader = trimmed.replace(/^🚀\s*/, '');
            htmlResult += `<br><strong style="color: #00ff66; font-family: Georgia, serif; font-style: italic; font-weight: bold; font-size: 1.1rem; text-shadow: 0 0 8px rgba(0,255,102,0.5); display: block; margin-top: 14px;">🚀 ${cleanHeader}</strong>`;
        }
        else if (/^[0-9]+\s*-/.test(trimmed) || /^[0-9]+\./.test(trimmed) || /^⭐\s*[0-9]+/.test(trimmed)) {
            let cleanSub = trimmed.replace(/^⭐\s*/, '');
            htmlResult += `<br><strong style="color: #bf00ff; font-family: Georgia, serif; font-style: italic; font-weight: bold; display: block; margin-top: 10px;">⭐ ${cleanSub}</strong>`;
        }
        else {
            htmlResult += `<div style="margin-left: 15px; margin-top: 4px; color: #e2e8f0; font-size: 0.95rem; line-height: 1.5;">${trimmed}</div>`;
        }
    });

    return htmlResult;
}

// --- Fitaovana fandraisana sy fitehirizana sary ---
function previewArisonImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewContainer = document.getElementById('arisonImagePreviewContainer');
            const previewImg = document.getElementById('arisonSelectedImagePreview');
            if (previewContainer && previewImg) {
                previewImg.src = e.target.result;
                previewContainer.style.display = 'flex';
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function clearArisonSelectedImage() {
    const imageInput = document.getElementById('arisonImageInput');
    const previewContainer = document.getElementById('arisonImagePreviewContainer');
    const previewImg = document.getElementById('arisonSelectedImagePreview');
    if (imageInput) imageInput.value = '';
    if (previewImg) previewImg.src = '';
    if (previewContainer) previewContainer.style.display = 'none';
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function saveChatHistory() {
    const chatContainer = document.getElementById('arisonChatMessages');
    if (chatContainer) {
        localStorage.setItem('arison_chat_history', chatContainer.innerHTML);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedHistory = localStorage.getItem('arison_chat_history');
    const chatContainer = document.getElementById('arisonChatMessages');
    if (savedHistory && chatContainer) {
        chatContainer.innerHTML = savedHistory;
    }
});