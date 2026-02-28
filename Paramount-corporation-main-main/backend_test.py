#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class ParamountFoodAPITester:
    def __init__(self, base_url="https://meat-processing-hub.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        
    def log_result(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result for reporting"""
        result = {
            "test_name": test_name,
            "success": success,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data: Dict = None, headers: Dict = None) -> tuple:
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        default_headers = {'Content-Type': 'application/json'}
        if headers:
            default_headers.update(headers)
            
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=default_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=default_headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED - Status: {response.status_code}")
                try:
                    response_json = response.json()
                    print(f"   Response: {json.dumps(response_json, indent=2)[:200]}...")
                except:
                    response_json = response.text[:200] if response.text else "No content"
                    print(f"   Response: {response_json}")
            else:
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                try:
                    error_json = response.json()
                    print(f"   Error: {json.dumps(error_json, indent=2)}")
                except:
                    print(f"   Error: {response.text}")
                    
            # Log the result
            self.log_result(
                name, 
                success, 
                f"Status: {response.status_code}, Expected: {expected_status}",
                response.json() if success and response.content else response.text
            )
            
            return success, response.json() if success and response.content else response.text
            
        except requests.exceptions.ConnectionError as e:
            print(f"❌ FAILED - Connection Error: {str(e)}")
            self.log_result(name, False, f"Connection Error: {str(e)}")
            return False, {}
        except requests.exceptions.Timeout as e:
            print(f"❌ FAILED - Timeout Error: {str(e)}")
            self.log_result(name, False, f"Timeout Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ FAILED - Error: {str(e)}")
            self.log_result(name, False, f"Error: {str(e)}")
            return False, {}

    def test_server_connectivity(self):
        """Test basic server connectivity"""
        print("\n" + "="*50)
        print("TESTING SERVER CONNECTIVITY")
        print("="*50)
        
        # Test root API endpoint
        success, response = self.run_test(
            "API Root Endpoint",
            "GET", 
            "",
            200
        )
        
        return success

    def test_status_endpoints(self):
        """Test status check endpoints"""
        print("\n" + "="*50)
        print("TESTING STATUS ENDPOINTS")
        print("="*50)
        
        # Test GET status endpoint
        get_success, _ = self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )
        
        # Test POST status endpoint
        test_status_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        
        post_success, response = self.run_test(
            "Create Status Check", 
            "POST",
            "status",
            200,
            test_status_data
        )
        
        return get_success and post_success

    def test_contact_form_endpoint(self):
        """Test contact form submission"""
        print("\n" + "="*50)
        print("TESTING CONTACT FORM ENDPOINT")
        print("="*50)
        
        # Test valid contact form submission
        test_contact_data = {
            "name": "Test User",
            "email": "test@example.com", 
            "subject": "Test Inquiry",
            "message": "This is a test message from automated testing."
        }
        
        success, response = self.run_test(
            "Submit Contact Form",
            "POST",
            "contact",
            200,
            test_contact_data
        )
        
        # Test invalid email format
        invalid_contact_data = {
            "name": "Test User",
            "email": "invalid-email",
            "subject": "Test",
            "message": "Test message"
        }
        
        invalid_success, _ = self.run_test(
            "Submit Contact Form (Invalid Email)",
            "POST", 
            "contact",
            422,  # Validation error expected
            invalid_contact_data
        )
        
        return success

    def test_frontend_connectivity(self):
        """Test if frontend loads properly"""
        print("\n" + "="*50)
        print("TESTING FRONTEND CONNECTIVITY")
        print("="*50)
        
        try:
            response = requests.get(self.base_url, timeout=30)
            success = response.status_code == 200
            
            if success:
                self.tests_run += 1
                self.tests_passed += 1
                print(f"✅ PASSED - Frontend loads: Status {response.status_code}")
                self.log_result("Frontend Loading", True, f"Status: {response.status_code}")
            else:
                self.tests_run += 1
                print(f"❌ FAILED - Frontend loading: Status {response.status_code}")
                self.log_result("Frontend Loading", False, f"Status: {response.status_code}")
                
            return success
            
        except Exception as e:
            self.tests_run += 1
            print(f"❌ FAILED - Frontend Error: {str(e)}")
            self.log_result("Frontend Loading", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run comprehensive API tests"""
        print("🚀 Starting Paramount Food Corporation API Tests")
        print(f"📡 Testing against: {self.base_url}")
        print(f"🕒 Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Test server connectivity first
        if not self.test_server_connectivity():
            print("\n💥 CRITICAL: Server connectivity failed. Stopping tests.")
            return False
            
        # Test individual endpoints
        self.test_status_endpoints()
        self.test_contact_form_endpoint() 
        self.test_frontend_connectivity()
        
        # Print final results
        print(f"\n" + "="*60)
        print("📊 FINAL TEST RESULTS")
        print("="*60)
        print(f"Total Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed / self.tests_run * 100):.1f}%" if self.tests_run > 0 else "0%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check logs above.")
            return False

    def save_test_results(self, filename: str = "backend_test_results.json"):
        """Save test results to JSON file"""
        results = {
            "timestamp": datetime.now().isoformat(),
            "base_url": self.base_url,
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_details": self.test_results
        }
        
        try:
            with open(filename, 'w') as f:
                json.dump(results, f, indent=2)
            print(f"\n📁 Test results saved to: {filename}")
        except Exception as e:
            print(f"\n❌ Failed to save results: {e}")

def main():
    """Main test execution function"""
    tester = ParamountFoodAPITester()
    
    try:
        success = tester.run_all_tests()
        tester.save_test_results()
        return 0 if success else 1
        
    except KeyboardInterrupt:
        print("\n🛑 Tests interrupted by user")
        return 1
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())