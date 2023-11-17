pipeline {
    agent any

    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        nodejs "nodejs"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
         stage('Build') {
            steps {
                sh "npm start"
                
            }
        }
        stage('test') {
            steps {
                sh "npm test"
                
            }
        }

        
    }
}
