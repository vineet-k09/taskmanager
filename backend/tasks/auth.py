from rest_framework_simplejwt.authentication import JWTAuthentication
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try to get access token from cookies
        access_token = request.COOKIES.get("access")
        if access_token:
            raw_token = access_token
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        return None