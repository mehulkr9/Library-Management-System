const axios = require('axios');

async function testRecommendations() {
    try {
        console.log('Testing server connection...');
        
        // Test if server is running
        const serverResponse = await axios.get('http://localhost:8080/');
        console.log('✅ Server is running:', serverResponse.data);
        
        // Test recommendations endpoint with a sample user ID
        console.log('\nTesting recommendations endpoint...');
        
        // First, let's try to get users to find a valid user ID
        try {
            const usersResponse = await axios.get('http://localhost:8080/api/user');
            console.log('📋 Found users:', usersResponse.data.length);
            
            if (usersResponse.data.length > 0) {
                const testUserId = usersResponse.data[0]._id;
                console.log('🔍 Testing with user ID:', testUserId);
                
                const recommendResponse = await axios.get(`http://localhost:8080/api/recommend/${testUserId}`);
                console.log('✅ Recommendations response:', recommendResponse.data);
                console.log('📚 Number of recommended books:', recommendResponse.data.recommendedBooks?.length || 0);
                
                if (recommendResponse.data.recommendedBooks?.length > 0) {
                    console.log('📖 First recommended book:', recommendResponse.data.recommendedBooks[0].name);
                }
            } else {
                console.log('⚠️ No users found in database');
            }
            
        } catch (userError) {
            console.log('❌ Error getting users:', userError.response?.data || userError.message);
            
            // Try with a dummy user ID anyway
            console.log('🔍 Testing with dummy user ID...');
            const recommendResponse = await axios.get('http://localhost:8080/api/recommend/60d0fe4f5311236168a109ca');
            console.log('✅ Recommendations response:', recommendResponse.data);
        }
        
    } catch (error) {
        console.log('❌ Server connection failed:', error.message);
        console.log('💡 Make sure the backend server is running with: npm start');
        
        if (error.code === 'ECONNREFUSED') {
            console.log('🔧 The server is not running. Start it with:');
            console.log('   cd server');
            console.log('   npm start');
        }
    }
}

testRecommendations();
