// Simple test to check if your Gemini API key works

const API_KEY = 'AIzaSyD0Sk1Wg18Fwg5LOrsn4ectrUaFDDzJTF8'

async function testAPI() {
  console.log('🧪 Testing Gemini API...')
  console.log('API Key:', API_KEY.substring(0, 10) + '...')

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Say "Hello, API works!" in one sentence.'
            }]
          }]
        })
      }
    )

    console.log('Response Status:', response.status)
    const data = await response.json()

    if (data.error) {
      console.error('❌ API Error:', data.error.message)
      console.error('Details:', data.error)
    } else {
      console.log('✅ API Works!')
      console.log('Response:', data.candidates[0].content.parts[0].text)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testAPI()
