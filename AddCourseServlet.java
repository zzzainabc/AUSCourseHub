import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

@WebServlet("/AddCourseServlet")
public class AddCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    // GET: gets course info for individual user who logged in
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        HttpSession session = request.getSession(false);
        String userId = (session != null) ? (String) session.getAttribute("userId") : null;
        
        if (userId == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"success\": false, \"message\": \"Not logged in\"}");
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "SELECT * FROM courses WHERE user_id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, userId);
            ResultSet rs = pstmt.executeQuery();
            
            StringBuilder jsonArray = new StringBuilder("[");
            boolean first = true;
            while (rs.next()) {
                if (!first) jsonArray.append(",");
                jsonArray.append("{")
                    .append("\"course_id\":").append(rs.getInt("course_id")).append(",")
                    .append("\"courseCode\":\"").append(escapeJson(rs.getString("course_code"))).append("\",")
                    .append("\"courseName\":\"").append(escapeJson(rs.getString("course_name"))).append("\",")
                    .append("\"semester\":\"").append(escapeJson(rs.getString("semester"))).append("\",")
                    .append("\"instructor\":\"").append(escapeJson(rs.getString("instructor"))).append("\"")
                    .append("}");
                first = false;
            }
            jsonArray.append("]");
            out.print("{\"success\": true, \"courses\": " + jsonArray.toString() + "}");
            
        } catch (Exception e) {
            response.setStatus(500);
            out.print("{\"success\": false, \"message\": \"" + e.getMessage() + "\"}");
        }
    }

    // POST: adds a new course
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession(false);
        String userId = (String) session.getAttribute("userId");

        String code = request.getParameter("courseCode");
        String name = request.getParameter("courseName");
        String sem = request.getParameter("semester");
        String inst = request.getParameter("instructor");
        String email = request.getParameter("instructorEmail");

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "INSERT INTO courses (user_id, course_code, course_name, semester, instructor, instructor_email) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, userId);
            pstmt.setString(2, code);
            pstmt.setString(3, name);
            pstmt.setString(4, sem);
            pstmt.setString(5, inst);
            pstmt.setString(6, email);
            pstmt.executeUpdate();

            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                int newId = rs.getInt(1);
                out.print("{\"success\": true, \"course\": {" +
                    "\"course_id\":" + newId + "," +
                    "\"courseCode\":\"" + escapeJson(code) + "\"," +
                    "\"courseName\":\"" + escapeJson(name) + "\"," +
                    "\"semester\":\"" + escapeJson(sem) + "\"," +
                    "\"instructor\":\"" + escapeJson(inst) + "\"" +
                    "}}");
            }
        } catch (Exception e) {
            response.setStatus(500);
            out.print("{\"success\": false, \"message\": \"" + e.getMessage() + "\"}");
        }
    }

    private String escapeJson(String s) {
        return (s == null) ? "" : s.replace("\"", "\\\"");
    }
}