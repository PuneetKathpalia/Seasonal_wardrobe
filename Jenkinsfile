pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        IMAGE_PREFIX = 'yourusername/seasonal-wardrobe'
        VERSION = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Code checked out successfully.'
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                echo '🧹 Cleaning up old containers...'
                bat '''
                docker stop seasonal-wardrobe-backend || exit 0
                docker rm seasonal-wardrobe-backend || exit 0
                docker stop seasonal-wardrobe-frontend || exit 0
                docker rm seasonal-wardrobe-frontend || exit 0
                docker stop seasonal-wardrobe-mongodb || exit 0
                docker rm seasonal-wardrobe-mongodb || exit 0
                '''
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('backend') {
                            bat 'npm install'
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                bat 'docker build -t %IMAGE_PREFIX%-backend:%VERSION% ./backend'
                bat 'docker build -t %IMAGE_PREFIX%-frontend:%VERSION% ./frontend'
            }
        }

        stage('Push to Docker Hub') {
            when { branch 'main' }
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
                        bat 'docker push %IMAGE_PREFIX%-backend:%VERSION%'
                        bat 'docker push %IMAGE_PREFIX%-frontend:%VERSION%'
                    }
                }
            }
        }

        stage('Deploy (Docker Compose)') {
            steps {
                echo '🚀 Deploying application...'
                bat 'docker-compose down && docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment successful!'
        }
        failure {
            echo '❌ Build failed! Please check Jenkins logs for details.'
        }
    }
}
