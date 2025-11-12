pipeline {
    agent any
    
    environment {
        // Docker Hub credentials (configure in Jenkins)
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_IMAGE_PREFIX = 'yourusername/seasonal-wardrobe'
        
        // Application versions
        BACKEND_IMAGE = "${DOCKER_IMAGE_PREFIX}-backend"
        FRONTEND_IMAGE = "${DOCKER_IMAGE_PREFIX}-frontend"
        VERSION = "${BUILD_NUMBER}"
        
        // Environment
        NODE_ENV = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Environment Info') {
            steps {
                sh '''
                    echo "Node version:"
                    node --version
                    echo "NPM version:"
                    npm --version
                    echo "Docker version:"
                    docker --version
                    echo "Docker Compose version:"
                    docker-compose --version
                '''
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh 'npm ci'
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }
        
        stage('Lint & Test') {
            parallel {
                stage('Backend Lint') {
                    steps {
                        dir('backend') {
                            echo 'Running backend linting...'
                            // Add your lint command if you have one
                            // sh 'npm run lint'
                        }
                    }
                }
                stage('Frontend Lint') {
                    steps {
                        dir('frontend') {
                            echo 'Running frontend linting...'
                            // Add your lint command if you have one
                            // sh 'npm run lint'
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        script {
                            echo "Building backend image: ${BACKEND_IMAGE}:${VERSION}"
                            dir('backend') {
                                docker.build("${BACKEND_IMAGE}:${VERSION}")
                                docker.build("${BACKEND_IMAGE}:latest")
                            }
                        }
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        script {
                            echo "Building frontend image: ${FRONTEND_IMAGE}:${VERSION}"
                            dir('frontend') {
                                docker.build("${FRONTEND_IMAGE}:${VERSION}")
                                docker.build("${FRONTEND_IMAGE}:latest")
                            }
                        }
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                echo 'Running security scans...'
                // Add security scanning tools like Trivy
                // sh "trivy image ${BACKEND_IMAGE}:${VERSION}"
                // sh "trivy image ${FRONTEND_IMAGE}:${VERSION}"
            }
        }
        
        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
                        echo 'Pushing images to Docker Hub...'
                        
                        // Push backend
                        docker.image("${BACKEND_IMAGE}:${VERSION}").push()
                        docker.image("${BACKEND_IMAGE}:latest").push()
                        
                        // Push frontend
                        docker.image("${FRONTEND_IMAGE}:${VERSION}").push()
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Deploying to staging environment...'
                sh '''
                    docker-compose down
                    docker-compose up -d
                '''
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                echo 'Deploying to production environment...'
                sh '''
                    docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
                    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Running health checks...'
                sh '''
                    # Wait for services to be ready
                    sleep 30
                    
                    # Check backend health
                    curl -f http://localhost:5000/ || exit 1
                    
                    # Check frontend health
                    curl -f http://localhost:3000/ || exit 1
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded! 🎉'
            // Send success notification
            // emailext (
            //     subject: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            //     body: "The build was successful!",
            //     to: "team@example.com"
            // )
        }
        failure {
            echo 'Pipeline failed! ❌'
            // Send failure notification
            // emailext (
            //     subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            //     body: "The build failed. Check Jenkins for details.",
            //     to: "team@example.com"
            // )
        }
        always {
            echo 'Cleaning up...'
            // Clean workspace
            cleanWs()
            
            // Remove dangling images
            sh 'docker system prune -f || true'
        }
    }
}
